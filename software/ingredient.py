import DBConnection

class Ingredient:
    
    def __init__(self, id, name):
        self.id
        self.name

class IngredientDB:
    
    def __handleIngredients(self, cursor):
        self.ingredients = []
        for id, name in cursor:
            ingredient = Ingredient(id, name)
            self.ingredients.append(ingredient)
            
    def loadAll(self):
        query = "SELECT id, name FROM ingredient"
        query += " order by name desc"
        DBConnection.query(query, None, self.__handleIngredients)
        if len(self.ingredients) < 1:
            return []
        return self.ingredients
        

def read_all():
    IngredientDB().loadAll()
    