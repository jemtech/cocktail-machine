import Objects from "./Objects"

class Recipe {
	
	constructor(obj) {
		obj && Object.assign(this, obj);
	}
	
	static loadAll(callback){
		Objects.load(function(data){
			let arrayLength = data.length;
			let recipes = [];
			for (let i = 0; i < arrayLength; i++) {
				let recipe = new Recipe(data[i]);
				recipes.push(recipe);
			}
			callback(recipes);
		}, Recipe.API_ENDPOINT);
	}
	
	save(callback){
		let scope = this;
		Objects.save(this, function(recipe){
			recipe && Object.assign(scope, recipe);
			callback(scope);
		}, Recipe.API_ENDPOINT);
	}
	
	prepare(callback){
		let scope = this;
		Objects.post(this, function(data){
			// TODO may retunred a queue
			callback(scope);
		}, Recipe.API_ENDPOINT + '/' + this.id + '/prepare');
	}
	
	insert() {
		Objects.save(this, function(data){
			Object.assign(this, data)
		}, Recipe.API_ENDPOINT)
	}
}
Recipe.API_ENDPOINT = "recipe";
export default Recipe;