import UiElement from "../UiElement";
import Ingredient from "../../objects/Ingredient"
import Pump from "../../objects/Pump"
import $ from "jquery";

class PumpMappingForm extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<from></from>');
		super.setBaseJQueryObject(this.baseElement);
		
		let scope = this;
		this.pumps = [];
		Pump.loadAll(function(pumps){
				let arrayLength = pumps.length;
				for (let i = 0; i < arrayLength; i++) {
					scope.pumps.push(pumps[i]);
				}
			});
		this.ingredients = [];
		Ingredient.loadAll(function(ingredients){
				let arrayLength = ingredients.length;
				for (let i = 0; i < arrayLength; i++) {
					scope.ingredients.push(ingredients[i]);
				}
			});
			
		this.renderPumpSelect();
		this.renderIngredientSelect();
		this.saveButton = $('<button type="submit" class="btn btn-primary mb-3">Save</button>')
		this.baseElement.append(this.saveButton);
	}
	
	renderPumpSelect(){
		this.pumpSelect = $('<div class="mb-3"></div>');
		this.baseElement.append(this.pumpSelect);
		this.pumpSelect.append($('<label for="pumpSelectInput1" class="form-label">Pump</label>'));
		this.pumpSelect.append($('<select class="form-select" aria-label="select pump">'));
		let arrayLength = this.pumps.length;
		for (let i = 0; i < arrayLength; i++) {
			let pump = this.pumps[i];
			this.pumpSelect.append($('<option value="' + pump.id + '">' + pump.id + '</option>'));
		}
		
	}
	
	renderIngredientSelect(){
		this.pumpSelect = $('<div class="mb-3"></div>');
		this.baseElement.append(this.pumpSelect);
		this.pumpSelect.append($('<label for="pumpSelectInput1" class="form-label">Pump</label>'));
		this.pumpSelect.append($('<select class="form-select" aria-label="select pump">'));
		let arrayLength = this.ingredients.length;
		for (let i = 0; i < arrayLength; i++) {
			let ingredient = this.ingredients[i];
			this.pumpSelect.append($('<option value="' + ingredient.id + '">' + ingredient.name + '</option>'));
		}
		
	}
}
export default PumpMappingForm;