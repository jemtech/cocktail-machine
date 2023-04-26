from threading import Thread
import config
import web.webServer as webServer
import cocktailMashine

config.configLogger()

theCocktailMashine = cocktailMashine.getCocktailMashineSigelton()

webServerThread = Thread(target=webServer.startServer)
webServerThread.start()


def pumpLoop(pump):
    print('to pump type the amount in ml')
    print('to go back type exit')
    inputVal = input()
    if inputVal == 'exit':
        return
    else:
        ml = float(inputVal)
        if ml > 0:
            pump.pump(ml)
    pumpLoop(pump)

def mainLoop():
    try:
        print('to list pumps type pumps')
        print('to select a pump type its number')
        print('to quit type quit')
        inputVal = input()
        
        if inputVal == 'pumps':
            for pump in theCocktailMashine.pumps:
                print('Pump: ' + str(pump.id))
                print('|-pcf_fw: ' + str(pump.pcf_fw))
                print('|-pcf_bw: ' + str(pump.pcf_bw))
        
        elif inputVal == 'quit':
            return
        else:
            pumpId = int(inputVal)
            for pump in theCocktailMashine.pumps:
                if pump.id == pumpId:
                    pumpLoop(pump)
                    break
    except:
        print('Error')
    mainLoop()
mainLoop()