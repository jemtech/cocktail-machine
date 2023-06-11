import UiElement from "../UiElement";
import PumpMappingList from "./PumpMappingList";
import PumpMappingForm from "./PumpMappingForm"
import $ from "jquery";

class PumpMappingUi extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<div class="container"></div>');
		super.setBaseJQueryObject(this.baseElement);
		this.baseElement.append($('<h2>Pump mappings</h2>'));
		this.pumpMappingList = new PumpMappingList()
		this.append(this.pumpMappingList);
		this.pumpMappingForm = new PumpMappingForm()
		this.append(this.pumpMappingForm);
	}
}
export default PumpMappingUi;