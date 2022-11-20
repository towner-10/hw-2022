import cohere
import os
import json
import re

if os.environ["IMAGE_GEN"] == "True":
    from image_gen import Model

if os.environ["IMAGE_GEN"] == "True":
    modelGen = Model(1, 1, os.environ["MODEL_ID"])


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
            print(line)
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

    def save_guide(self, id_, guide_text):
        # Write JSON to file
        with open(os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id_}/output.json'), 'w') as outfile:
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
            "images": {}
        }

        # Get the steps from the co:here API
        steps = self.get_steps(question)
        guide_text["steps"] = steps[0]
        guide_text["parts"] = steps[1]

        self.save_guide(id_, guide_text)

        # TODO: Get the paragraphs for each step from co:here API
        paragraphs = self.get_paragraphs(steps)
        guide_text["paragraphs"] = paragraphs
        print(guide_text)

        self.save_guide(id_, guide_text)

        if os.environ["IMAGE_GEN"] == "True":
            images = modelGen.batch_pipe(id, question, directory)
        guide_text["images"] = images

        self.save_guide(id, guide_text)

    def get_steps(self, question):
        # Get the prompt file, and the question from the user
        print(f"Getting steps for: {question}")
        prompt_file = open(os.path.join(os.path.dirname(__file__), 'static/prompt.txt'), 'r')
        prompt = prompt_file.read() + "Question: %s\n\nList of Parts and Steps:" % question

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
        print("Raw Steps:\n" + rawSteps)
        steps = parse_steps(rawSteps)
        return steps

    def get_paragraphs(self, steps):
        prompt_file = open(os.path.join(os.path.dirname(__file__), 'static/prompt.txt'), 'r')

        # print('Prediction: {}'.format(response.generations[0].text))
        print(steps)
        # for i in range(len(steps)):
        #     for j in range(len(steps[i])):
        #         prompt = prompt_file.read() + "Write a paragraph about a step in the question:\nQuestion: <Question>\nPart title: <Part title>\nStep 2: <Step>\nParagraph:"
        #         response = self.co.generate(
        #             model='52811f2c-7d95-4259-8ec1-257616552f3f-ft',
        #             prompt='',
        #             max_tokens=100,
        #             temperature=0.9,
        #             k=0,
        #             p=0.75,
        #             frequency_penalty=0,
        #             presence_penalty=0,
        #             stop_sequences=["---"],
        #             return_likelihoods='NONE')



        paragraphs = {
            0: {
                "0": "This is a paragraph for step 0 of part 0",
                "1": "This is a paragraph for step 1 of part 0"
            },
            1: {
                "0": "This is a paragraph for step 0 of part 1",
                "1": "This is a paragraph for step 1 of part 1"
            }
        }
        return paragraphs
