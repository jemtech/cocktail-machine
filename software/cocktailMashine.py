import config
from pump import Pump

class CocktailMashine:
    
    def __init__(self):
        self.pumps = None
        self.ingredientsPumpDic = {}
        self._configurePumps()

    def mapIngredient(self, ingredient, pump):
        self.ingredientsPumpDic[ingredient.id] = pump
        
    def pumpIngredient(self, ingredient, ml):
        pump = self.ingredientsPumpDic.get(ingredient.id)
        pump.pump(ml)
        
    def executeRecipe(self, recipe):
        for recipeItem in recipe.recipeItems:
            self.pumpIngredient(recipeItem.ingredient, recipeItem.ml)
            
    def _configurePumps(self):
        self.pumps = []
        pumpsConfig = config.getPumpConfig()
        count = pumpsConfig['ALL']['count']
        for i in range(count):
            pumpConfig = pumpsConfig[str(i)]
            pump = Pump(
                id = i,
                pcf_address = pumpConfig['pcf_address'],
                i2c_port_num = pumpConfig['i2c_port_num'],
                pcf_fw = pumpConfig['pcf_fw'],
                pcf_bw = pumpConfig['pcf_bw'])
            self.pumps.add(pump)