# needed to pwm the speed
import Adafruit_PCA9685
# direction control
from pcf8574 import PCF8574

import time

class Pump:
    pwm = None
    
    def __init__(self, id, mlPerS = 150.0, pwmChannel = None, pcf_address = 0x20,
                  i2c_port_num = 1, pcf_fw = 0, pcf_bw = 1, pullBackMl = 1):
        self.id = id
        self.mlPerS = mlPerS
        self.pwmChannel = pwmChannel
        self.pcf = PCF8574(i2c_port_num, pcf_address)
        self.pullBackMl = pullBackMl
        self.pcf_fw = pcf_fw
        self.pcf_bw = pcf_bw
    
    def setSpeed(self, speed):
        if self.pwmChannel is None:
            return
        if Pump.pwm is None:
            Pump.pwm = Adafruit_PCA9685.PCA9685()
        Pump.pwm.set_pwm(self.pwmChannel, 0, 4096*speed)
    
    def pump(self, ml):
        pumpTimeS = float(ml + self.pullBackMl) / self.mlPerS
        pullBackTimeS = float(self.pullBackMl) / self.mlPerS
        self.forward()
        time.sleep(pumpTimeS)
        backward()
        time.sleep(pullBackTimeS)
        self.stop()
        
    def forward(self):
        pcf_ports = self.pcf.port
        pcf_ports[self.pcf_fw] = True
        pcf_ports[self.pcf_bw] = False
        self.pcf.port = pcf_ports
        
    def backward(self):
        pcf_ports = self.pcf.port
        pcf_ports[self.pcf_fw] = False
        pcf_ports[self.pcf_bw] = True
        self.pcf.port = pcf_ports
        
    def stop(self):
        pcf_ports = self.pcf.port
        pcf_ports[self.pcf_fw] = False
        pcf_ports[self.pcf_bw] = False
        self.pcf.port = pcf_ports
        