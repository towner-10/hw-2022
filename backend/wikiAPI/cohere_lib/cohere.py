import threading
import cohere
import os
import json
import re
from collections import defaultdict

if os.environ["IMAGE_GEN"] == "True":
    from image_gen import Model
    modelGen = Model(os.environ["MODEL_ID"])


def parse_steps(rawText):
    current_part = 0
    steps = {
        0: {

        }
    }
    parts = {
        0: {

        }
    }
    rawText = rawText[1:-3]
    for line in rawText.splitlines():
        if line[0:4] == "Part":
            current_part += 1
            steps[current_part] = {}
            parts[current_part] = line

        elif line[0:4] == "Step":
            # print(line)
            try:
                steps[current_part][int(line[5:6])] = line
            except:
                try:
                    steps[current_part][re.search("/^\d+$/", line)] = line
                except:
                    pass

    return steps, parts


class CoHereClient:
    # Initialize the client with the API token
    def __init__(self, api_token):
        self.co = cohere.Client(api_token)
        self.paragraphs_prompt_file = open(os.path.join(
            os.path.dirname(__file__), 'static/paragraph_prompt.txt'), 'r')
        self.steps_prompt_file = open(os.path.join(
            os.path.dirname(__file__), 'static/prompt.txt'), 'r')
        self.threaded_paragraphs = {}

    def save_guide(self, id, guide_text):
        # Write JSON to file
        with open(os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}/output.json'), 'w') as outfile:
            json.dump(guide_text, outfile)

    def save_guide_text(self, id_, question):
        # Create a directory for the guide based on the ID
        directory = os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id_}')
        if not os.path.exists(directory):
            os.makedirs(directory)

        # Returns a JSON object with the following structure:
        guide_text = {
            "title": question,
            "parts": {},
            "steps": {},
            "paragraphs": {},
            "images": {},
            "finished": False
        }

        # Get the steps from the co:here API
        steps = self.get_steps(question)
        guide_text["steps"] = steps[0]
        guide_text["parts"] = steps[1]

        print("Done getting steps")

        self.save_guide(id_, guide_text)

        # TODO: Get the paragraphs for each step from co:here API
        paragraphs = self.get_paragraphs(steps, guide_text["title"])
        guide_text["paragraphs"] = paragraphs

        print("Done getting paragraphs")

        self.save_guide(id_, guide_text)

        if os.environ["IMAGE_GEN"] == "True":
            images = modelGen.batch_pipe(
                len(steps[0]), 3, id_, question, directory)
            guide_text["images"] = images

        print("Done getting images")

        guide_text["finished"] = True

        self.save_guide(id_, guide_text)

    def get_steps(self, question):
        # Get the prompt file, and the question from the user
        print(f"Getting steps for: {question}")
        prompt = self.steps_prompt_file.read(
        ) + "Question: %s\n\nList of Parts and Steps:" % question

        # Get the steps from the co:here API
        response = self.co.generate(
            model='xlarge',
            prompt=prompt,
            max_tokens=300,
            temperature=0.9,
            k=0,
            p=1,
            frequency_penalty=0,
            presence_penalty=0,
            stop_sequences=["--"],
            return_likelihoods='NONE')

        # Parse the steps from the response
        rawSteps = format(response.generations[0].text)
        steps = parse_steps(rawSteps)
        return steps

    def get_paragraph(self, question, steps, i, j):
        print(f"Getting paragraph for step {i}.{j}")
        prompt = self.paragraphs_prompt + "\nWrite a paragraph about the following step relevant to the question below.\nQuestion: %s\n%s\n%s\n\nParagraph:" % (
            question, steps[1][i],
            steps[0][i][j])
        try:
            response = self.co.generate(
                model='f7cf93f1-5087-4b62-b4f0-71f59d91c8b7-ft',
                prompt=prompt,
                max_tokens=100,
                temperature=0.9,
                k=0,
                p=0.75,
                frequency_penalty=0,
                presence_penalty=0,
                stop_sequences=["--"],
                return_likelihoods='NONE')
            if not len(response.generations) > 0:
                print(f"No paragraph response for step {i}.{j}")
            else:
                paragraph = format(response.generations[0].text)
                paragraph = paragraph.replace('**', '').replace('\n', '').replace('-', '')
                self.threaded_paragraphs[i][j] = paragraph
        except cohere.CohereError as e:
            print(e.message)

    def get_paragraphs(self, steps, question):
        self.threaded_paragraphs = defaultdict(dict)
        self.threaded_paragraphs[0] = defaultdict(int)
        self.paragraphs_prompt = self.paragraphs_prompt_file.read()

        threads = []

        for i in range(0, len(steps[0])):
            for j in range(1, len(steps[0][i])):
                threads.append(threading.Thread(
                    target=self.get_paragraph, args=(question, steps, i, j)))

        print(f"Starting {len(threads)} threads")
        self.execute_batched_threads(threads, 2)

        if self.threaded_paragraphs[0] == {}:
            self.threaded_paragraphs.pop(0)

        return self.threaded_paragraphs

    def execute_batched_threads(self, threads, batch_size):
        for i in range(0, len(threads), batch_size):
            batch = threads[i:i + batch_size]
            for thread in batch:
                thread.start()
            for thread in batch:
                thread.join()