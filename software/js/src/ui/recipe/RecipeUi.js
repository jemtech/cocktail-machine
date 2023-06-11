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
		this.baseElement.append(this.recipeList.getJQueryRepresentation());
		this.recipeForm = new RecipeForm();
		this.baseElement.append(this.recipeForm.getJQueryRepresentation());
		
	}
}
export default RecipeUi;