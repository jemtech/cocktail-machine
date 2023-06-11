import UiElement from "../UiElement";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import $ from "jquery";

class IngredientUi extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<div class="container"></div>');
		super.setBaseJQueryObject(this.baseElement);
		this.baseElement.append($('<h2>Ingredients</h2>'));
		this.ingredientList = new IngredientList();
		this.baseElement.append(this.ingredientList.getJQueryRepresentation());
		this.ingredientForm = new IngredientForm();
		this.baseElement.append(this.ingredientForm.getJQueryRepresentation());
	}
}
export default IngredientUi;