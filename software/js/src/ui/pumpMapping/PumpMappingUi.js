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
		this.baseElement.append(this.pumpMappingList.getJQueryRepresentation());
		this.pumpMappingForm = new PumpMappingForm()
		this.baseElement.append(this.pumpMappingForm.getJQueryRepresentation());
	}
}
export default PumpMappingUi;