import UiElement from "../UiElement";
import Ingredient from "../../objects/Ingredient"
import RecipeItem from "../../objects/RecipeItem"
import Select from "../inputs/Select"
import Event from "../../misc/Event"
import $ from "jquery";

class RecipeItemForm extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<from></from>');
		super.setBaseJQueryObject(this.baseElement);
		if (config) {
			if (config.recipeId) {
				this.setRecipeId(config.recipeId);
			}
			if (config.recipeItem) {
				this.setRecipeItem(config.recipeItem);
			}
			if(config.remoteSave) {
				this.remoteSave = config.remoteSave;
			}
		}
		
		this.renderIngredientSelect();
		this.rendeMlInput();
		if(!this.remoteSave) {
			this.renderSaveButton();
		}
		
		let scope = this;
		this.ingredients = [];
		Ingredient.loadAll(function(ingredients){
				scope.ingredientSelect.clearItems();
				let arrayLength = ingredients.length;
				for (let i = 0; i < arrayLength; i++) {
					let ingredient = ingredients[i];
					scope.ingredients.push(ingredient);
					scope.ingredientSelect.addSelectItem(ingredient.id, ingredient.name);
				}
			});
	}
	
	setRecipeId(recipeId){
		this.recipeId = recipeId;
	}
	
	setRecipeItem(recipeItem){
		this.recipeItem = recipeItem;
		this.setRecipeId(this.recipeItem.recipe);
	}
	
	renderSaveButton(){
		this.saveButton = $('<button type="submit" class="btn btn-primary mb-3">Save</button>')
		this.append(this.saveButton);
		let scope = this;
		this.saveButton.click(function(event){
			scope.save();
		});
	}
	
	save(){
		if (this.recipeItem == null) {
			this.recipeItem = new RecipeItem();
			this.recipeItem.recipe = this.recipeId;
		}
		
		this.recipeItem.ingredient = parseInt(this.ingredientSelect.val());
		this.recipeItem.ml = parseFloat(this.mlInputInput.val())
		if(this.recipeItem.ml == '' || this.recipeItem.ml == null){
			console.log('recipeItem has no ml. Not saved!');
			return;
		}
		let scope = this;
		this.recipeItem.save(function(recipeItem){
			scope.setRecipeItem(recipeItem)
			let event = new Event({
				type: Event.TYPE_SAVE,
				data: recipeItem
			});
			scope.notify(event);
		});
		
	}
	
	renderIngredientSelect(){
		this.ingredientSelect = new Select({labelText: 'Ingredient'});
		this.append(this.ingredientSelect);
	}
	
	rendeMlInput(){
		this.mlInputDiv = $('<div class="input-group mb-3">');
		this.append(this.mlInputDiv);
		this.mlInputInput = $('<input type="number" class="form-control" placeholder="ml" step="0.1" min="0" max="1000">');
		this.mlInputDiv.append(this.mlInputInput);
		let addon = $('<span class="input-group-text" id="basic-addon2">ml</span>');
		this.mlInputDiv.append(addon);
		if(this.recipeItem){
			this.mlInputInput.text(this.recipeItem.ml);
		}
	}
}
export default RecipeItemForm;