import Objects from "./Objects"
import Ingredient from "./Ingredient"

class PumpMapping {
	
	constructor(obj) {
		obj && Object.assign(this, obj);
		this.ingredient = null;
	}
	
	static loadAll(callback){
		Objects.load(function(data){
			let arrayLength = data.length;
			let pumpMappings = [];
			for (let i = 0; i < arrayLength; i++) {
				let pump = new PumpMapping(data[i]);
				pumpMappings.push(pump);
			}
			callback(pumpMappings);
		}, PumpMapping.API_ENDPOINT);
	}
	
	getIngedient(){
		if(this.ingredient == null){
			let scope = this;
			Ingredient.loadById(function(ingredient){
				scope.setIngredient(ingredient)
			}, id);
		}
		return this.ingredient;
	}
	
	setIngredient(ingredient){
		this.ingredient = ingredient;
		this.ingredientId = ingredient.id;
		return this;
	}
	
}
Pump.API_ENDPOINT = "pump_mapping"
export default PumpMapping;