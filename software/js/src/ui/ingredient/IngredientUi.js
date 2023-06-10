import UiElement from "../UiElement";
import IngredientList from "./IngredientList";
import $ from "jquery";

class IngedientUi extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<div></div>');
		this.baseElement.append($('<h2>Ingredients</h2>'));
		this.ingredientList = new IngredientList()
		this.baseElement.append(this.ingredientList.getJQueryRepresentation());
	}
}
export default IngedientUi;