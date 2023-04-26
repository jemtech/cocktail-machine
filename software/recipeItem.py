import db.DBConnection as DBConnection

class RecipeItem(object):
    
    def __init__(self, ingredient, recipe, ml):
        self.ingredient = ingredient
        self.recipe = recipe
        self.ml = ml

class RecipeItemDB:
    
    def __handleRecipeItems(self, cursor):
        self.recipeItems = []
        for ingredient, recipe, ml in cursor:
            recipeItem ={
                'ingredient': ingredient,
                'recipe': recipe,
                'ml': ml
                }
            self.recipeItems.append(recipeItem)
            
    def loadAll(self, recipeId):
        query = "SELECT ingredient, recipe, ml FROM recipeItem"
        query += " WHERE recipe=" + str(recipeId)
        query += " order by name desc"
        DBConnection.query(query, None, self.__handleRecipeItems)
        if len(self.recipeItems) < 1:
            return []
        return self.recipeItems


def read_all(recipeId):
    RecipeItemDB().loadAll(recipeId)