# needed to pwm the speed
import Adafruit_PCA9685
# direction control
from pcf8574 import PCF8574

import time

class Pump:
    pwm = Adafruit_PCA9685.PCA9685()
    
    def __init__(self, id, mlPerS = 150.0, pwmChannel = None, pcf_address = 0x20,
                  i2c_port_num = 1, pcf_fw = 0, pcf_bw = 1, pullBackMl = 1):
        self.id = id
        self.mlPerS = mlPerS
        self.pwmChannel = pwmChannel
        self.pcf = PCF8574(i2c_port_num, pcf_address)
        self.pullBack = pullBackMl
    
    def setSpeed(self, speed):
        Pump.pwm.set_pwm(self.pwmChannel, 0, 4096*speed)
    
    def pump(self, ml):
        pumpTimeS = float(ml + pullBackMl) / self.mlPerS
        pullBackTimeS = float(pullBackMl) / self.mlPerS
        self.forward()
        time.sleep(pumpTimeS)
        backward()
        time.sleep(pullBackTimeS)
        self.stop()
        
    def forward(self):
        pcf_ports = pcf.port
        pcf_ports[pcf_fw] = True
        pcf_ports[pcf_bw] = False
        pcf.port = pcf_ports
        
    def backward(self):
        pcf_ports = pcf.port
        pcf_ports[pcf_fw] = False
        pcf_ports[pcf_bw] = True
        pcf.port = pcf_ports
        
    def stop(self):
        pcf_ports = pcf.port
        pcf_ports[pcf_fw] = False
        pcf_ports[pcf_bw] = False
        pcf.port = pcf_ports
        