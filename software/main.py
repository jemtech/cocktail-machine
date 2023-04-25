from threading import Thread
import config
import web.webServer as webServer
from cocktailMashine import CocktailMashine 

config.configLogger()

theCocktailMashine = CocktailMashine()

def startApiServer():
    # create a thread
    thread = Thread(target=webServer.startServer)
    # run the thread
    thread.start()
    
startApiServer()


def pumpLoop(pump):
    print('to pump type the amount in ml')
    print('to to go back type exit')
    input = input()
    if input == 'exit':
        return
    else:
        ml = float(input)
        if ml > 0:
            pump.pump(ml)
            

def mainLoop():
    print('to list pumps type pumps')
    print('to select a pump type its number')
    input = input()
    
    if input == 'pumps':
        for pump in theCocktailMashine.pumps:
            print('Pump: ' + str(pump.id))
            print('|-pcf_fw: ' + str(pump.pcf_fw))
            print('|-pcf_bw: ' + str(pump.pcf_bw))
    else:
        pumpId = int(input)
        for pump in theCocktailMashine.pumps:
            if pump.id == pumpId:
                pumpLoop(pump)
                break
    mainLoop()
mainLoop()