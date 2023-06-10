import $ from "jquery";
import UiElement from "../UiElement";

class TableRow extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<tr></tr>');
		super.setBaseJQueryObject(this.baseDiv);
	}
	
	
	append(toAppend) {
		let cell = $('<td></td>');
		this.baseElement.append(cell);
		if (toAppend instanceof UiElement) {
			cell.append(toAppend.getJQueryRepresentation());
		} else {
			cell.append(toAppend);
		}
	}
	
}
export default TableRow;