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
		this.nameInputInput.text(this.ingredient.alcohol * 100);
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
			scope.ingredient.alcohol = scope.alcoholInputInput.val() / 100.0;
			
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
	
	renderAlcoholInput(){
		this.alcoholInputDiv = $('<div class="input-group mb-3">');
		this.baseElement.append(this.alcoholInputDiv);
		this.alcoholInputInput = $('<input type="number" class="form-control" placeholder="0.0" step="0.01" min="0" max="99.99">');
		this.alcoholInputDiv.append(this.alcoholInputInput);
		this.alcoholInputApendix = $('<span class="input-group-text">%</span>');
		this.alcoholInputDiv.append(this.alcoholInputApendix);
	}
}
export default IngredientForm;