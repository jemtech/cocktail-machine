import UiElement from "../UiElement";
import Ingredient from "../../objects/Ingredient"
import Pump from "../../objects/Pump"
import PumpMapping from "../../objects/PumpMapping"
import Select from "../inputs/Select"
import Event from "../../misc/Event"
import $ from "jquery";

class PumpMappingForm extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<from></from>');
		super.setBaseJQueryObject(this.baseElement);
		
		this.renderPumpSelect();
		this.renderIngredientSelect();
		this.renderSaveButton();
		
		let scope = this;
		this.pumps = [];
		Pump.loadAll(function(pumps){
				scope.pumpSelect.clearItems();
				let arrayLength = pumps.length;
				for (let i = 0; i < arrayLength; i++) {
					let pump = pumps[i];
					scope.pumps.push(pump);
					scope.pumpSelect.addSelectItem(pump.id, pump.id);
				}
			});
		this.ingredients = [];
		Ingredient.loadAll(function(ingredients){
				scope.ingredientSelect.clearItems();
				let arrayLength = ingredients.length;
				for (let i = 0; i < arrayLength; i++) {
					let ingredient = ingredients[i];
					scope.ingredients.push(ingredient);
					scope.ingredientSelect.addSelectItem(ingredient.id, ingredient.name);
				}
			});
	}
	
	renderSaveButton(){
		this.saveButton = $('<button type="submit" class="btn btn-primary mb-3">Save</button>')
		this.baseElement.append(this.saveButton);
		let scope = this;
		this.saveButton.click(function(event){
			if (scope.pumpMapping == null) {
				scope.pumpMapping = new PumpMapping();
			}
			
			
			scope.pumpMapping.pumpId = parseInt(scope.pumpSelect.val());
			scope.pumpMapping.ingredientId = parseInt(scope.ingredientSelect.val());
			
			scope.pumpMapping.save(function(pumpMapping){
				let event = new Event({
					type: Event.TYPE_SAVE,
					data: pumpMapping
				});
				scope.notify(event);
			});
		});
	}
	
	renderPumpSelect(){
		this.pumpSelect = new Select({labelText: 'Pump'});
		this.baseElement.append(this.pumpSelect.getJQueryRepresentation());
	}
	
	renderIngredientSelect(){
		this.ingredientSelect = new Select({labelText: 'Ingredient'});
		this.baseElement.append(this.ingredientSelect.getJQueryRepresentation());
	}
}
export default PumpMappingForm;