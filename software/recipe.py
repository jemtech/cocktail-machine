import db.DBConnection as DBConnection
from recipeItem import RecipeItem

class Recipe(object):
    
    def __init__(self, id, name):
        self.id = id
        self.name = name
        
    @staticmethod
    def queryById(id):
        dict = RecipeDB().loadById(id)
        return RecipeDB(id=dict['id'], name=dict['name'])
    
    def recipeItems(self):
        return RecipeItem.queryAll(self.id)

class RecipeDB:
    
    def __handleRecipes(self, cursor):
        self.recipes = []
        for id, name in cursor:
            recepy = {
                'id': id,
                'name': name
                }
            self.recipes.append(recipe)
            
    def loadAll(self):
        query = "SELECT id, name FROM recipe"
        query += " order by name desc"
        DBConnection.query(query, None, self.__handleRecipes)
        if len(self.recipes) < 1:
            return []
        return self.recipes
            
    def loadById(self, id):
        query = "SELECT id, name FROM recipe Where id=%s"
        DBConnection.query(query, (id,), self.__handleRecipes)
        if len(self.recipes) < 1:
            return
        return self.recipes[0]
    
    def insert(self, my_recipe):
        data = (my_recipe['name'],)
        DBConnection.dbAction("INSERT INTO recipe (name) VALUES (%s) RETURNING id,name", data, self.__handleIngredients, commit = True)
        return self.recipes[0]
        

def read_all():
    return RecipeDB().loadAll()

def insert(my_recipe):
    return RecipeDB().insert(my_recipe)
    
    