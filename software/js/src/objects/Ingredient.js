import Objects from "./Objects"

class Ingredient {
	
	constructor(obj) {
		obj && Object.assign(this, obj);
	}
	
	static loadAll(callback){
		Objects.load(function(data){
			let arrayLength = data.length;
			let ingredients = [];
			for (let i = 0; i < arrayLength; i++) {
				let ingredient = new Ingredient(data[i]);
				ingredients.push(ingredient);
			}
			callback(ingredients);
		}, Ingredient.API_ENDPOINT);
	}
	
	static loadById(callback, id){
		Objects.load(function(data){
			let ingredient = new Ingredient(data)
			callback(ingredient);
		}, Ingredient.API_ENDPOINT + '/' + id);
	}
	
	save() {
		Objects.save(this, function(data){
			Object.assign(this, data)
		}, Ingredient.API_ENDPOINT)
	}
}
Ingredient.API_ENDPOINT = "ingredient";
export default Ingredient;