import UiElement from "../UiElement";
import RecipeList from "./RecipeList";
import $ from "jquery";

class RecipeUi extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<div></div>');
		this.baseElement.append($('<h2>Recipes</h2>'));
		this.recipeList = new RecipeList();
		this.baseElement.append(this.recipeList.getJQueryRepresentation());
	}
}
export default RecipeUi;