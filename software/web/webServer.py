from flask import render_template
import connexion
import config
import os

def startServer():
    # Create the application instance
    app = connexion.App(__name__, specification_dir='./')

    # Read the swagger.yml file to configure the endpoints
    app.add_api('swagger.yml')
    
    webConfig = config.getConfig()['WEB']
    debugmode = True
    if(os.environ.get('SERVICE') == True):
        # no debug mode on boot
        debugmode = False
    app.run(host=webConfig['host'], port=webConfig['port'], debug=debugmode, use_reloader=False)
    
# Create a URL route in our application for "/"
#@app.route('/')
def home():
    """
    This function just responds to the browser ULR
    localhost:5000/
    :return:        the rendered template 'home.html'
    """
    return render_template('index.html')