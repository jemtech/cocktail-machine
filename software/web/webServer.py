from flask import render_template
import connexion
import config

def startServer():
    # Create the application instance
    app = connexion.App(__name__, specification_dir='./')

    # Read the swagger.yml file to configure the endpoints
    app.add_api('swagger.yml')
    
    webConfig = config.getConfig()['WEB']
    app.run(host=webConfig['host'], port=webConfig['port'], debug=False)
    
# Create a URL route in our application for "/"
#@app.route('/')
def home():
    """
    This function just responds to the browser ULR
    localhost:5000/
    :return:        the rendered template 'home.html'
    """
    return render_template('index.html')