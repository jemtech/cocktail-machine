import UiElement from "../UiElement";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import $ from "jquery";

class RecipeUi extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<div class="container"></div>');
		super.setBaseJQueryObject(this.baseElement);
		this.baseElement.append($('<h2>Recipes</h2>'));
		this.recipeList = new RecipeList();
		this.append(this.recipeList);
		this.renderNewRecipeButton();
	}
	
	renderNewRecipeButton() {
		this.newRecipeButton = $('<button type="submit" class="btn btn-primary mb-3">New</button>');
		this.append(this.newRecipeButton);
		let scope = this;
		this.newRecipeButton.click(function(event){
			scope.recipeForm = new RecipeForm();
			scope.append(scope.recipeForm);
		});
	}
}
export default RecipeUi;