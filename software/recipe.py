import db.DBConnection as DBConnection

class Recipe(object):
    
    def __init__(self, id, name):
        self.id = id
        self.name = name

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
        

def read_all():
    return RecipeDB().loadAll()
    