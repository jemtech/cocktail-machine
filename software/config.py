import configparser
import misc
import logging

class Config:
    configCach = None
    pumpConfigCach = None
    
    @staticmethod
    def getConfig():
        if Config.configCach is None:
            configCach = configparser.ConfigParser()
            configCach.read((misc.scriptDir() + "/config.conf"))
        return configCach
    
    @staticmethod
    def getPumpConfig():
        config_file = Config.getConfig()['PUMPS']['config_file']
        if Config.pumpConfigCach is None:
            pumpConfigCach = configparser.ConfigParser()
            pumpConfigCach.read((misc.scriptDir() + "/" + config_file))
        return pumpConfigCach
    
def getConfig():
    return Config.getConfig()

def getPumpConfig():
    return Config.getPumpConfig()

def configLogger():
    loggerConfig = {}
    configFile = Config.getConfig()['Logger']
    if len(configFile) < 1:
        return
    loggerConfig['filename'] = configFile['filename']
    loggerConfig['level'] = configFile['level']
#    loggerConfig['format'] = configFile['format']
    logging.basicConfig(**loggerConfig)