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

    def save_guide(self, id, guide_text):
        # Write JSON to file
        with open(os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}/output.json'), 'w') as outfile:
            json.dump(guide_text, outfile)

    def save_guide_text(self, id, question):
        # Create a directory for the guide based on the ID
        directory = os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}')
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

        self.save_guide(id, guide_text)

        # TODO: Get the paragraphs for each step from co:here API
        paragraphs = self.get_paragraphs(steps, guide_text["title"])
        guide_text["paragraphs"] = paragraphs
        print(guide_text)

        self.save_guide(id, guide_text)

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
        # print("Raw Steps:\n" + rawSteps)
        steps = parse_steps(rawSteps)
        return steps

    def get_paragraphs(self, steps, question):
        prompt_file = open(os.path.join(os.path.dirname(__file__), 'static/paragraph_prompt.txt'), 'r')
        paragraphs = {0: {0: ""}}
        # print('Prediction: {}'.format(response.generations[0].text))
        for i in range(1,len(steps[0])):
            # print(steps[0][i]) #--> this prints the list of steps in each part i
            for j in range(1, len(steps[0][i])):
                # print(steps[1][i])
                # print(steps[0][i][j])
                prompt = prompt_file.read() + "Write a paragraph about the following step relevant to the question below.\nQuestion: %s\n%s\n%s\n\nParagraph:" % (
                    question, steps[1][i],
                    steps[0][i][j])
                print(prompt)
                response = self.co.generate(
                    model='f7cf93f1-5087-4b62-b4f0-71f59d91c8b7-ft',
                    prompt=prompt,
                    max_tokens=100,
                    temperature=0.9,
                    k=0,
                    p=0.75,
                    frequency_penalty=0,
                    presence_penalty=0,
                    stop_sequences=["---"],
                    return_likelihoods='NONE')
                paragraph = format(response.generations[0].text)
                print(paragraph)
                paragraphs[i] = {j:paragraph}
                # try:
                #
                #
                #
                # except Exception as e:  # work on python 3.x
                #     print('error: ' + str(e))

        # paragraphs = {
        #     0: {
        #         "0": "This is a paragraph for step 0 of part 0",
        #         "1": "This is a paragraph for step 1 of part 0"
        #     },
        #     1: {
        #         "0": "This is a paragraph for step 0 of part 1",
        #         "1": "This is a paragraph for step 1 of part 1"
        #     }
        # }
        return paragraphs
