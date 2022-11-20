from flask import *
from flask_cors import CORS
import os
import uuid
from cohere_lib import CoHereClient
import threading

app = Flask(__name__)
CORS(app)
client = CoHereClient(os.environ["API_TOKEN"])

@app.get('/api/new-guide')
def new_guide():
    prompt = request.args.get("prompt")
    id = uuid.uuid4()

    t = threading.Thread(target=client.save_guide_text, args=(id, prompt))
    t.start()
    return {
        'id': id
    }

@app.get('/api/guide/<id>')
def get_guide(id):
    directory = os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}')
    if not os.path.exists(directory):
        return {
            'status': 404,
            'error': 'Guide not found'
        }

    with open(os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}/output.json'), 'r') as outfile:
        return {
            'status': 200,
            'response': json.load(outfile)
        }

if __name__ == '__main__':
    app.run(threaded=True)
