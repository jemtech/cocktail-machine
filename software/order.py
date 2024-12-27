import db.DBConnection as DBConnection

class Order(object):
    
    def __init__(self, id, recipe, createdAt, processingStatus):
        self.id = id
        self.recipe = recipe
        self.createdAt = createdAt
        self.processingStatus = processingStatus
        
    @staticmethod
    def queryById(id):
        dict = OrderDB().loadById(id)
        return Order(id=dict['id'], recipe=dict['recipe'], createdAt=dict['createdAt'], processingStatus=dict['processingStatus'])
    
    def toHash(self):
        return {
                'id': self.id,
                'recipe': self.recipe,
                'createdAt': self.createdAt,
                'processingStatus': self.processingStatus
                }

class OrderDB:
    
    def __handleOrders(self, cursor):
        self.orders = []
        for id, recipe, createdAt, processingStatus in cursor:
            order = {
                'id': id,
                'recipe': recipe,
                'createdAt': createdAt,
                'processingStatus': processingStatus
                }
            self.orders.append(order)
            
    def loadAll(self):
        query = "SELECT id, recipe, createdAt, processingStatus FROM order"
        query += " order by createdAt desc"
        DBConnection.query(query, None, self.__handleOrders)
        if len(self.orders) < 1:
            return []
        return self.orders
            
    def loadById(self, id):
        query = "SELECT id, recipe, createdAt, processingStatus FROM order Where id=%s"
        DBConnection.query(query, (id,), self.__handleOrders)
        if len(self.orders) < 1:
            return
        return self.orders[0]
    
    def insert(self, order):
        data = (order['recipe'], "new")
        DBConnection.dbAction("INSERT INTO order (recipe, processingStatus) VALUES (%s, %s) RETURNING id, recipe, createdAt, processingStatus", data, self.__handleOrders, commit = True)
        return self.orders[0]
    
    def update(self, order):
        data = (order['processingStatus'], order['id'])
        DBConnection.dbAction("UPDATE order SET processingStatus=%s Where id=%s) RETURNING id, recipe, createdAt, processingStatus", data, self.__handleOrders, commit = True)
        return self.orders[0]

def read_all():
    return OrderDB().loadAll()

def read_one(orderId):
    return OrderDB().loadById(orderId)

def insert(order):
    return OrderDB().insert(order)

def cancel(orderId):
    order = {
        'id': orderId,
        'processingStatus': 'canceled'
        }
    return OrderDB().update(order)
    