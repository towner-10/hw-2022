from waitress import serve
import app

# Serve the app using WSGI server
serve(app, host='0.0.0.0', port=8080)