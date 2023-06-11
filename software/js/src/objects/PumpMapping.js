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
				let pumpMapping = new PumpMapping(data[i]);
				pumpMappings.push(pumpMapping);
			}
			callback(pumpMappings);
		}, PumpMapping.API_ENDPOINT);
	}
	
	save(callback){
		let scope = this;
		Objects.put(this, function(pumpMapping){
			pumpMapping && Object.assign(scope, pumpMapping);
			callback(scope);
		}, PumpMapping.API_ENDPOINT);
	}
	
	getIngredient(){
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
PumpMapping.API_ENDPOINT = "pump_mapping"
export default PumpMapping;