import mysql.connector as mariadb
import Config
from builtins import Exception

class DBConnection:
    POOL_NAME = "dbPool"
    dbPool = None
    @staticmethod
    def getConnection():
        if DBConnection.dbPool is None:
            config = Config.getConfig()
            dbconfig = {
              "host": config['DB']['host'],
              "database": config['DB']['database'],
              "user": config['DB']['user'],
              "password": config['DB']['password']
            }
            DBConnection.dbPool = mariadb.connect(pool_name = DBConnection.POOL_NAME,  pool_size = 32, **dbconfig)
        return mariadb.connect(pool_name = DBConnection.POOL_NAME)

def insert(query, values):
    dbAction(query, values, commit = True)
        
def query(query, values, resultHandler):
    dbAction(query, values, resultHandler)
        
def dbAction(query, values, resultHandler=None, commit = False):
    try:
        connection = DBConnection.getConnection();
        cursor = connection.cursor(buffered=True)
        cursor.execute(query, values)
        if commit:
            connection.commit()
        if not (resultHandler is None):
            resultHandler(cursor)
    except Exception as e: 
        logging.error(e)
    finally:
        try:
            connection.close()
        except Exception as e: 
            logging.error(e)
            

        
    
