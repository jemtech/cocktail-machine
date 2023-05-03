import Objects from "./Objects"

class Pump {
	
	constructor(obj) {
		obj && Object.assign(this, obj);
	}
	
	static loadAll(callback){
		Objects.load(function(data){
			let arrayLength = data.length;
			let pumps = [];
			for (let i = 0; i < arrayLength; i++) {
				let pump = new Pump(data[i]);
				pumps.push(pump);
			}
			callback(pumps);
		}, Pump.API_ENDPOINT);
	}
	
}
Pump.API_ENDPOINT = "pump"
export default Pump;