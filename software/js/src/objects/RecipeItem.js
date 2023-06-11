import Objects from "./Objects"

class RecipeItem {
	
	constructor(obj) {
		obj && Object.assign(this, obj);
	}
	
	static loadAll(callback, recipeId){
		Objects.load(function(data){
			let arrayLength = data.length;
			let recipeItems = [];
			for (let i = 0; i < arrayLength; i++) {
				let recipeItem = new RecipeItem(data[i]);
				recipeItems.push(recipeItem);
			}
			callback(recipeItems);
		}, RecipeItem.API_ENDPOINT + '?recipeId=' + recipeId);
	}
	
	save(callback) {
		let scope = this;
		Objects.save(this, function(data){
			Object.assign(scope, data)
			if(callback) {
				callback(scope);
			}
		}, RecipeItem.API_ENDPOINT)
	}
}
RecipeItem.API_ENDPOINT = "recipeItem";
export default RecipeItem;