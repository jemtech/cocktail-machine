import UiElement from "../UiElement";
import PumpList from "./PumpList";
import $ from "jquery";

class PumpUi extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<div></div>');
		super.setBaseJQueryObject(this.baseElement);
		this.baseElement.append($('<h2>Pumps</h2>'));
		this.pumpList = new PumpList()
		this.baseElement.append(this.pumpList.getJQueryRepresentation());
	}
}
export default IngedientUi;