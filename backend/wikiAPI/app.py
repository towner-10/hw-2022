from flask import Flask, request, send_file
import json
from flask_cors import CORS
import os
import uuid
from cohere_lib import CoHereClient
import threading

app = Flask(__name__)
CORS(app)
client = CoHereClient(os.environ["API_TOKEN"])


@app.get('/')
def index():
    return "Hello World"


@app.get('/api/new-guide')
def new_guide():
    prompt = request.args.get("prompt")
    id = uuid.uuid4()

    cohere = threading.Thread(target=client.save_guide_text, args=(id, prompt))
    cohere.start()
    return {
        'id': id
    }


@app.get('/api/guide/<id>')
def get_guide(id):
    directory = os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}\\output.json')
    if not os.path.exists(directory):
        return {
            'status': 404,
            'error': 'Guide not found'
        }

    with open(os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}\\output.json'), 'r') as outfile:
        return {
            'status': 200,
            'response': json.load(outfile)
        }


@app.get('/api/guide/<id>/<image>')
def get_image(id, image):
    path = os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}\\images\\{image}')
    if not os.path.exists(path):
        path = os.listdir(os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}\\images'))[0]
        print(f"Alternative image found at: {path}")
        if not os.path.exists(path):
            return {
                'status': 404,
                'error': 'Image not found'
            }

    print(f"Returning image: {path}")
    return send_file(path, mimetype='image/png')

@app.get('/api/guides/recommended')
def get_recommended():
    guides = [
        '626a7744-973c-4787-9fd4-b0412ceebdde',
        '242c9c63-78e9-4b7f-a3f2-2e3fd239f195',
        '74ad0557-7282-446d-8774-8e6abe0e1c4c',
    ]

    res = []

    for guide in guides:
        with open(os.path.join(os.environ["GUIDE_DIRECTORY"], f'{guide}\\output.json'), 'r') as outfile:
            res.append(json.load(outfile))

    return {
        'status': 200,
        'response': res
    }

if __name__ == '__main__':
    print("Starting server...")
    app.run(threaded=True)
