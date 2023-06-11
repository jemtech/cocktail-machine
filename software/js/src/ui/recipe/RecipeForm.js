import UiElement from "../UiElement";
import Recipe from "../../objects/Recipe"
import Event from "../../misc/Event"
import RecipeItemForm from "../recipeItem/RecipeItemForm"
import $ from "jquery";

class RecipeForm extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<from></from>');
		super.setBaseJQueryObject(this.baseElement);
		
		this.renderNameInput();
		this.renderSaveButton();
		
		if (config.recipe) {
			this.setRecipe(config.recipe);
		}
	}
	
	addRecipeItemForm(){
		this.recipeItemForm = RecipeItemForm({recipeId: this.recipe.id});
		this.baseElement.append(this.recipeItemForm.getJQueryRepresentation());
	}
	
	setRecipe(recipe){
		this.recipe = recipe;
		this.nameInputInput.text(this.recipe.name);
		this.addRecipeItemForm();
	}
	
	renderSaveButton(){
		this.saveButton = $('<button type="submit" class="btn btn-primary mb-3">Save</button>')
		this.baseElement.append(this.saveButton);
		let scope = this;
		this.saveButton.click(function(event){
			if (scope.recipe == null) {
				scope.recipe = new Recipe();
			}
			
			scope.recipe.name = scope.nameInputInput.val();
			
			scope.recipe.save(function(recipe){
				scope.setRecipe(recipe);
				let event = new Event({
					type: Event.TYPE_SAVE,
					data: recipe
				});
				scope.notify(event);
			});
		});
	}
	
	renderNameInput(){
		this.nameInputDiv = $('<div class="input-group mb-3">');
		this.baseElement.append(this.nameInputDiv);
		this.nameInputInput = $('<input type="text" class="form-control" placeholder="Recipe name">');
		this.nameInputDiv.append(this.nameInputInput);
	}
}
export default RecipeForm;