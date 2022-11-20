import cohere
import os
import json
import re

def parse_steps(rawText) -> dict:
    current_part = 0
    steps = {
        0: {

        }
    }
    rawText = rawText[1:-3]
    for line in rawText.splitlines():
        if line[0:4] == "Part":
            current_part += 1
            steps[current_part] = {}

        elif line[0:4] == "Step":
            print(line)
            try:
                steps[current_part][int(line[5:6])] = line
            except:
                try:
                    steps[current_part][re.search("/^\d+$/", line)] = line
                except:
                    pass

    return steps

class CoHereClient:
    # Initalize the client with the API token
    def __init__(self, api_token):
        self.co = cohere.Client(api_token)

    def save_guide(self, id, guide_text):
        # Create a directory for the guide based on the ID
        directory = os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}')
        if not os.path.exists(directory):
            os.makedirs(directory)

        # Write JSON to file
        with open(os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}/output.json'), 'w') as outfile:
            json.dump(guide_text, outfile)

    def save_guide_text(self, id, question):
        # Returns a JSON object with the following structure:
        guide_text = {
            "title": question,
            "steps": {},
            "paragraphs": {},
            "images": {}
        }

        # Get the steps from the co:here API
        steps = self.get_steps(question)
        guide_text["steps"] = steps

        self.save_guide(id, guide_text)

        # TODO: Get the paragraphs for each step from co:here API
        paragraphs = self.get_paragraphs(steps)
        guide_text["paragraphs"] = paragraphs

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
        steps = parse_steps(rawSteps)
        return steps

    def get_paragraphs(self, steps):
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