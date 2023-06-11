import config
from pump import Pump

class CocktailMashine:
    singelton = None
    
    def __init__(self):
        self.pumps = None
        self.ingredientsPumpDic = {}
        self._configurePumps()

    def mapIngredient(self, ingredient, pump):
        self.ingredientsPumpDic[ingredient.id] = pump
        
    def pumpIngredient(self, ingredientId, ml):
        pump = self.ingredientsPumpDic.get(ingredientId)
        pump.pump(ml)
        
    def executeRecipe(self, recipe):
        for recipeItem in recipe.recipeItems():
            self.pumpIngredient(recipeItem.ingredient, recipeItem.ml)
        return recipe
            
    def _configurePumps(self):
        self.pumps = []
        pumpsConfig = config.getPumpConfig()
        count = int(pumpsConfig['ALL']['count'])
        for i in range(count):
            pumpConfig = pumpsConfig[str(i)]
            pump = Pump(
                id = i,
                pcf_address = int(pumpConfig['pcf_address'],0),
                i2c_port_num = int(pumpConfig['i2c_port_num']),
                pcf_fw = int(pumpConfig['pcf_fw']),
                pcf_bw = int(pumpConfig['pcf_bw']))
            self.pumps.append(pump)
            
def getCocktailMashineSigelton():
    if CocktailMashine.singelton is None:
        CocktailMashine.singelton = CocktailMashine()
    return CocktailMashine.singelton

def pump_mappings():
    pumpMappings = []
    ingredientsPumpDic = getCocktailMashineSigelton().ingredientsPumpDic
    for ingredientId in ingredientsPumpDic:
        pumpMapping = {'pumpId': ingredientsPumpDic[ingredientId].id, 'ingredientId': ingredientId}
        pumpMappings.append(pumpMapping)
    return pumpMappings

from ingredient import Ingredient 
def map_pump(mapping):
    cocktailMashine = getCocktailMashineSigelton()
    pump = cocktailMashine.pumps[mapping['pumpId']]
    ingredient = Ingredient.queryById(mapping['ingredientId'])
    cocktailMashine.mapIngredient(ingredient, pump)
    ingredientsPumpDic = getCocktailMashineSigelton().ingredientsPumpDic
    pumpMapping = {'pumpId': ingredientsPumpDic.get(ingredient.id).id, 'ingredientId': ingredient.id}
    return pumpMapping

from recipe import Recipe
def prepare(recipe):
    cocktailMashine = getCocktailMashineSigelton()
    recipe = Recipe.queryById(recipe['id'])
    return cocktailMashine.executeRecipe(recipe)
    
    
    
    