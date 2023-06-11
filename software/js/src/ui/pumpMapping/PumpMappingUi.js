import UiElement from "../UiElement";
import PumpMappingList from "./PumpMappingList";
import $ from "jquery";

class PumpMappingUi extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<div></div>');
		super.setBaseJQueryObject(this.baseElement);
		this.baseElement.append($('<h2>Pump mappings</h2>'));
		this.pumpMappingList = new PumpMappingList()
		this.baseElement.append(this.pumpMappingList.getJQueryRepresentation());
	}
}
export default PumpMappingUi;