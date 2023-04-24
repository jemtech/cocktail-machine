import configparser
import misc
import logging

class Config:
    configCach = None
    
    @staticmethod
    def getConfig():
        if Config.configCach is None:
            configCach = configparser.ConfigParser()
            configCach.read((misc.scriptDir() + "/config.conf"))
        return configCach
    
def getConfig():
    return Config.getConfig()

def configLogger():
    loggerConfig = {}
    configFile = Config.getConfig()['Logger']
    if len(configFile) < 1:
        return
    loggerConfig['filename'] = configFile['filename']
    loggerConfig['level'] = configFile['level']
#    loggerConfig['format'] = configFile['format']
    logging.basicConfig(**loggerConfig)