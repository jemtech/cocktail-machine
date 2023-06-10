import db.DBConnection as DBConnection

class Ingredient(object):
    
    def __init__(self, id, name):
        self.id = id
        self.name = name
        
    @staticmethod
    def queryAll():
        ingredients = []
        for dict in IngredientDB().loadAll():
            ingredient = Ingredient(id=dict['id'], name=dict['name'])
            ingredients.append(ingredient)
        return ingredients

class IngredientDB:
    
    def __handleIngredients(self, cursor):
        self.ingredients = []
        for id, name in cursor:
            ingredient = {
                'id': id,
                'name': name
                }
            self.ingredients.append(ingredient)
            
    def loadAll(self):
        query = "SELECT id, name FROM ingredient"
        query += " order by name desc"
        DBConnection.query(query, None, self.__handleIngredients)
        if len(self.ingredients) < 1:
            return []
        return self.ingredients
    
    def insert(self, ingredient):
        DBConnection.dbAction("INSERT INTO ingredient (name) VALUES ('" + str(ingredient['name']) + "') RETURNING id,name", None, self.__handleIngredients, commit = True)
        return self.ingredients[0]

def read_all():
    return IngredientDB().loadAll()
    
def insert(ingredient):
    return IngredientDB().insert(ingredient)
    