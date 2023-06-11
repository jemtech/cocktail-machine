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
				this.recipeId = config.recipeId;
			}
			if (config.recipeItem) {
				this.setRecipeItem(config.recipeItem);
			}
		}
		
		this.renderIngredientSelect();
		this.rendeMlInput();
		this.renderSaveButton();
		
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
	
	setRecipeItem(recipeItem){
		this.recipeItem = recipeItem;
		this.recipeId = this.recipeItem.recipe;
	}
	
	renderSaveButton(){
		this.saveButton = $('<button type="submit" class="btn btn-primary mb-3">Save</button>')
		this.baseElement.append(this.saveButton);
		let scope = this;
		this.saveButton.click(function(event){
			if (scope.recipeItem == null) {
				scope.recipeItem = new RecipeItem();
				scope.recipeItem.recipe = scope.recipeId;
			}
			
			scope.recipeItem.ingredient = parseInt(scope.ingredientSelect.val());
			scope.recipeItem.ml = parseFloat(scope.mlInputInput.val())
			
			scope.recipeItem.save(function(recipeItem){
				scope.setRecipeItem(recipeItem)
				let event = new Event({
					type: Event.TYPE_SAVE,
					data: recipeItem
				});
				scope.notify(event);
			});
		});
	}
	
	renderIngredientSelect(){
		this.ingredientSelect = new Select({labelText: 'Ingredient'});
		this.baseElement.append(this.ingredientSelect.getJQueryRepresentation());
	}
	
	rendeMlInput(){
		this.mlInputDiv = $('<div class="input-group mb-3">');
		this.baseElement.append(this.mlInputDiv);
		this.mlInputInput = $('<input type="text" class="form-control" placeholder="ml">');
		this.mlInputDiv.append(this.mlInputInput);
		let addon = $('<span class="input-group-text" id="basic-addon2">ml</span>');
		this.mlInputDiv.append(addon);
		if(this.recipeItem){
			this.mlInputInput.text(this.recipeItem.ml);
		}
	}
}
export default RecipeItemForm;