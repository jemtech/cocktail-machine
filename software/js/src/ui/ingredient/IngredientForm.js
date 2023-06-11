import UiElement from "../UiElement";
import Ingredient from "../../objects/Ingredient"
import Event from "../../misc/Event"
import $ from "jquery";

class IngredientForm extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<from></from>');
		super.setBaseJQueryObject(this.baseElement);
		
		this.renderNameInput();
		this.renderSaveButton();
		if (config) {
			if (config.ingredient) {
				this.setIngredient(config.ingredient);
			}
		}
	}
	
	setIngredient(ingredient){
		this.ingredient = ingredient;
		this.nameInputInput.text(this.ingredient.name);
	}
	
	renderSaveButton(){
		this.saveButton = $('<button type="submit" class="btn btn-primary mb-3">Save</button>')
		this.baseElement.append(this.saveButton);
		let scope = this;
		this.saveButton.click(function(event){
			if (scope.ingredient == null) {
				scope.ingredient = new Ingredient();
			}
			
			scope.ingredient.name = scope.nameInputInput.val();
			
			scope.ingredient.save(function(ingredient){
				scope.setIngredient(ingredient);
				let event = new Event({
					type: Event.TYPE_SAVE,
					data: ingredient
				});
				scope.notify(event);
			});
		});
	}
	
	renderNameInput(){
		this.nameInputDiv = $('<div class="input-group mb-3">');
		this.baseElement.append(this.nameInputDiv);
		this.nameInputInput = $('<input type="text" class="form-control" placeholder="Ingredient name">');
		this.nameInputDiv.append(this.nameInputInput);
	}
}
export default IngredientForm;