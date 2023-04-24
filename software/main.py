
import Config
import webServer

Config.configLogger()

theCocktailMashine = CocktailMashine()

def startApiServer():
    # create a thread
    thread = Thread(target=webServer.startServer)
    # run the thread
    thread.start()
    
startApiServer()