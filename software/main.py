from threading import Thread
import config
import web.webServer as webServer
import cocktailMashine
import ingredient
from ingredient import Ingredient

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
    
def ingredientsLoop():
    print('to list ingredients type list')
    print('to add a ingredient type add')
    print('to go back type exit')
    inputVal = input()
    if inputVal == 'exit':
        return
    elif inputVal == 'list':
        for ingredientVal in Ingredient.queryAll():
            print('Ingredient: ' + str(ingredientVal.name))
            print('|-id: ' + str(ingredientVal.id))
    elif inputVal == 'add':
        print('please enter ingredient name:')
        inputVal = input()
        newIngredient = {'name': inputVal}
        ingredient.insert(newIngredient)
    ingredientsLoop()

def mainLoop():
    try:
        print('to list pumps type pumps')
        print('to interact with ingredients type ingredients')
        print('to select a pump type its number')
        print('to quit type quit')
        inputVal = input()
        
        if inputVal == 'pumps':
            for pump in theCocktailMashine.pumps:
                print('Pump: ' + str(pump.id))
                print('|-pcf_fw: ' + str(pump.pcf_fw))
                print('|-pcf_bw: ' + str(pump.pcf_bw))
        if inputVal == 'ingredients':
            ingredientsLoop()
        elif inputVal == 'quit':
            return
        else:
            pumpId = int(inputVal)
            for pump in theCocktailMashine.pumps:
                if pump.id == pumpId:
                    pumpLoop(pump)
                    break
    except Exception as e:
        print(e)
    mainLoop()
mainLoop()