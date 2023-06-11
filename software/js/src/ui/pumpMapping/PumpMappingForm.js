import UiElement from "../UiElement";
import Ingredient from "../../objects/Ingredient"
import Pump from "../../objects/Pump"
import PumpMapping from "../../objects/PumpMapping"
import Select from "../inputs/Select"
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
		this.renderSaveButton();
	}
	
	renderSaveButton(){
		this.saveButton = $('<button type="submit" class="btn btn-primary mb-3">Save</button>')
		this.baseElement.append(this.saveButton);
		let scope = this;
		this.saveButton.click(function(event){
			if (scope.pumpMapping == null) {
				scope.pumpMapping = new PumpMapping();
			}
			
			
			scope.pumpMapping.pumpId = scope.pumpSelect.val();
			scope.pumpMapping.ingredientId = scope.ingredientSelect.val();
			
			scope.pumpMapping.save(function(pumpMapping){
				let event = new EVAEvent({
					type: EVAEvent.TYPE_SAVE,
					data: pumpMapping
				});
				scope.notify(event);
			});
		});
	}
	
	renderPumpSelect(){
		this.pumpSelect = new Select({labelText: 'Pump'});
		this.baseElement.append(this.pumpSelect.getJQueryRepresentation());
		let arrayLength = this.pumps.length;
		for (let i = 0; i < arrayLength; i++) {
			let pump = this.pumps[i];
			this.pumpSelect.addSelectItem(pump.id, pump.id);
		}
	}
	
	renderIngredientSelect(){
		this.ingredientSelect = new Select({labelText: 'Ingredient'});
		this.baseElement.append(this.ingredientSelect.getJQueryRepresentation());
		let arrayLength = this.ingredients.length;
		for (let i = 0; i < arrayLength; i++) {
			let ingredient = this.ingredients[i];
			this.ingredientSelect.addSelectItem(ingredient.id, ingredient.name);
		}
	}
}
export default PumpMappingForm;