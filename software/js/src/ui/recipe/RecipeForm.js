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
		this.renderCancelButton();
		this.renderAddRecipeItemButton();
		if (config) {
			if (config.recipe) {
				this.setRecipe(config.recipe);
			}
		}
		this.recipeItemForms = [];
	}
	
	addRecipeItemForm(){
		let recipeItemForm = new RecipeItemForm({remoteSave: true});
		this.recipeItemForms.push(recipeItemForm);
		this.append(recipeItemForm);
	}
	
	setRecipe(recipe){
		this.recipe = recipe;
		this.nameInputInput.text(this.recipe.name);
	}
	
	renderAddRecipeItemButton() {
		this.addRecipeItemButton = $('<button type="submit" class="btn btn-primary mb-3">Add recipe item</button>');
		this.append(this.addRecipeItemButton);
		let scope = this;
		this.addRecipeItemButton.click(function(event){
			scope.addRecipeItemForm();
		});
	}
	
	renderCancelButton() {
		this.cancelButton = $('<button type="submit" class="btn btn-primary mb-3">Cancel</button>');
		this.append(this.cancelButton);
		let scope = this;
		this.cancelButton.click(function(event){
			scope.remove();
		});
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
		this.saveButton.prop('disabled', true)
		if (this.recipe == null) {
			this.recipe = new Recipe();
		}
		
		this.recipe.name = this.nameInputInput.val();
		
		let scope = this;
		this.recipe.save(function(recipe){
			scope.setRecipe(recipe);
			scope.saveRecipeItems();
			let event = new Event({
				type: Event.TYPE_SAVE,
				data: recipe
			});
			scope.notify(event);
			scope.remove();
		});
	}
	
	saveRecipeItems() {
		let scope = this;
		this.recipeItemForms.forEach(function(recipeItemForm) {
			recipeItemForm.setRecipeId(scope.recipe.id);
			recipeItemForm.save();
			});
	}
	
	renderNameInput(){
		this.nameInputDiv = $('<div class="input-group mb-3">');
		this.append(this.nameInputDiv);
		this.nameInputInput = $('<input type="text" class="form-control" placeholder="Recipe name">');
		this.append(this.nameInputInput);
	}
}
export default RecipeForm;