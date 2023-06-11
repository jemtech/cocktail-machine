import db.DBConnection as DBConnection

class RecipeItem(object):
    
    def __init__(self, ingredient, recipe, ml):
        self.ingredient = ingredient
        self.recipe = recipe
        self.ml = ml
        
    @staticmethod
    def queryAll(recipeId):
        recipeItems = []
        for dict in RecipeItemDB().loadAll(recipeId):
            recipeItem = RecipeItem(ingredient=dict['ingredient'], recipe=dict['recipe'], ml=dict['ml'])
            recipeItems.append(recipeItem)
        return recipeItems

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
        data = (recipeId,)
        query = "SELECT ingredient, recipe, ml FROM recipeItem"
        query += " WHERE recipe=%s"
        query += " order by name desc"
        DBConnection.query(query, data, self.__handleRecipeItems)
        if len(self.recipeItems) < 1:
            return []
        return self.recipeItems
    
    def insert(self, recipeItem):
        data = (recipeItem['ingredient'], recipeItem['recipe'], recipeItem['ml'])
        DBConnection.dbAction("INSERT INTO recipeItem (ingredient, recipe, ml) VALUES (%s,%s,%s) RETURNING id,name", data, self.__handleRecipeItems, commit = True)
        return self.recipeItems[0]


def read_all(recipeId):
    return RecipeItemDB().loadAll(recipeId)

def insert(recipeItem):
    return RecipeItemDB().insert(recipeItem)