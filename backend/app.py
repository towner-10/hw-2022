from flask import Flask, request, send_file
import json
from flask_cors import CORS
import os
import uuid
from wikiAPI.cohere_lib import CoHereClient
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

    cohere = threading.Thread(target=client.save_guide_text, args=(id, prompt, 0))
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
        if not os.path.exists(path):
            return {
                'status': 404,
                'error': 'Image not found'
            }

    return send_file(path, mimetype='image/png')

@app.get('/api/guides/recommended')
def get_recommended():
    guides = [
        '626a7744-973c-4787-9fd4-b0412ceebdde',
        'c1453997-10df-4d7e-b94f-87ca66d0e9b3',
        '74ad0557-7282-446d-8774-8e6abe0e1c4c',
        '154f4cc7-c70a-49f0-80df-1a48e8bb6395'
    ]

    res = []

    for guide in guides:
        with open(os.path.join(os.environ["GUIDE_DIRECTORY"], f'{guide}\\output.json'), 'r') as outfile:
            result = json.load(outfile)
            result['id'] = guide
            res.append(result)

    return {
        'status': 200,
        'response': res
    }

if __name__ == '__main__':
    print("Starting server...")
    app.run(host='0.0.0.0', port=8080, threaded=True)
