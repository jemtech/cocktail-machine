import UiElement from "../UiElement";
import $ from "jquery";

class Select extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<div class="mb-3"></div>');
		if (!config.inputId) {
			config.inputId = "select_" + ++Select.ID_COUNT;
			this.inputId = config.inputId;
		}
		this.labelText = '';
		if (config.labelText) {
			this.labelText = config.labelText;
		}
		super.setBaseJQueryObject(this.baseElement);
		this.renderLabel();
		this.renderSelect();
	}
	
	val(newVal) {
		if (newVal) {
			return this.select.val(newVal).change();
		}
		let value = this.select.val();
		if (value == '--') {
			return null;
		}
		return value;
	}
	
	renderLabel(){
		this.label = $('<label for="' + this.inputId + '" class="form-label">' + this.labelText + '</label>')
		this.baseElement.append(this.label);
	}
	
	renderSelect(){
		this.select = $('<select class="form-select" id="' + this.inputId + '">')
		this.baseElement.append(this.select);
	}
	
	addSelectItem(value, text){
		this.select.append($('<option value="' + value + '">' + text + '</option>'));
	}
	
	clearItems(){
		this.select.html('');
	}
	
}
Select.ID_COUNT = 0;
export default Select;