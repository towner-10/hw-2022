from flask import Flask, request
from flask import jsonify




# this should be called when the user clicks submit
@app.route('/', methods=['GET', 'POST'])
def send_prompt():
    # get the prompt from the form
    global prompt
    prompt = request.form['form_name']



if __name__ == '__main__':
    app.run()
