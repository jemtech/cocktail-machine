
class CocktailMashine:
    
    def __init__(self):
        self.ingredientsPumpDic = {}

    def mapIngredient(self, ingredient, pump):
        self.ingredientsPumpDic[ingredient.id] = pump
        
    def pumpIngredient(self, ingredient, ml):
        pump = self.ingredientsPumpDic.get(ingredient.id)
        pump.pump(ml)
        
    def executeRecipe(self, recipe):
        for recipeItem in recipe.recipeItems:
            self.pumpIngredient(recipeItem.ingredient, recipeItem.ml)