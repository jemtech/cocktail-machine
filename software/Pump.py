
class Pump:
    
    def __init__(self):
        self.mlPerS = 150.0
    
    def pump(self, ml):
        pumpTimeMs = ml * 1000.0 / self.mlPerS
        
        