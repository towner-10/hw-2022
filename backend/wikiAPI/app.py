from flask import *
from flask import jsonify
import cohere
import os

co = cohere.Client(os.environ["api_token"])

app = Flask(__name__)


def parse_steps(rawText) -> dict:
    current_part = 0
    steps = {}
    rawText = rawText[1:-3]
    for line in rawText.splitlines():
        print(line)
        if line[0:4] == "Part":
            current_part += 1
            steps[current_part] = {}

        elif line[0:1] != '{' or line[0:1] != '-':
            steps[current_part][int(line[5:6])] = (line, "")

    return steps


@app.get('/api/get_tutorial/')
def get_tutorial():
    question = request.args.get("question")
    # todo get steps from cohere model and set data to string
    prompt_file = open('static/prompt.txt')
    prompt = prompt_file.read() + "Question: %s\n\nList of Parts and Steps:" % question
    print("prompt: %s" % prompt)
    response = co.generate(
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

    # temporary data to develope parsing function
    # test_data = "Part 1: Cleaning and Inspecting the Extinguisher\nStep 1: Empty and depressurize your extinguisher completely.\nStep 2: Wipe the outside of the extinguisher with a solvent-free cleanser.\nStep 3: Have the extinguisher repaired or replaced if you find any damage.\nStep 4: Remove the discharge hose from the operating valve.\nStep 5: Take off the valve assembly.\nPart 2: Refilling the Extinguisher\nStep 1: Purchase the correct kind of filler for your extinguisher.\nStep 2: Clean the valve assembly with a soft cloth or brush.\nStep 3: Reassemble the valve assembly and set it aside.\nStep 4: Remove any residual chemical agent from the cylinder.\nStep 5: Inspect the cylinder following CGA Visual Inspection Standard C-6.\nStep 6: Fill the cylinder with the amount of chemical specified on the label.\nStep 7: Clean the extinguisher to remove any chemical residue.\nStep 8: Reinstall the discharge valve.\n"
    rawSteps = format(response.generations[0].text)
    #print(rawSteps)
    steps = parse_steps(rawSteps)

    # todo iterate over each step to get paragraph

    print(steps)

    return steps


if __name__ == '__main__':
    app.run()
