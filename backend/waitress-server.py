from waitress import serve
import app as wikiAPI

# Serve the app using WSGI server
serve(wikiAPI.app, host='0.0.0.0', port=8080)