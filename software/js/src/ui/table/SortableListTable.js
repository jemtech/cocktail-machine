import SortableList from "../../misc/SortableList";
import UiElement from "../UiElement";
import $ from "jquery";

class SortableListTable extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<table></table>');
		super.setBaseJQueryObject(this.baseDiv);
		this.rowDatas = new SortableList();
	}
	
	renderEmpty() {
		this.clear();
		this.header = $('<thead></thead>');
		this.baseElement.append(this.header);
		this.headerRow = $('<tr></tr>');
		this.header.append(this.headerRow);
		this.body = $('<tbody></tbody>');
		this.baseElement.append(this.body);
	}
	
	push(data) {
		return this.pushRow(data, true);
	}
	
	pushRow(data, rerender) {
		this.rowDatas.push(data);
		if(rerender){
			this.rerender();
		}
		return this;
	}
	
	pushAll(data) {
		this.rowDatas.pushAll(data);
		this.rerender();
		return this;
	}
	
	clearRows() {
		this.rowDatas.clear();
		this.rerender();
		return this;
	}
	
	rerender() {
		if (this.table) {
			this.table.clearBody();
			this.renderRows();
		}
		return this;
	}
	
	renderRow(entry, row) {
		throw new Error("please override renderRow(entry)");
	}
	
	renderHead() {
		throw new Error("please override renderHead()");
	}
	
	newRow(){
		this.curentTableRowDiv = new TableRow();
		this.tableDiv.append(this.curentTableRowDiv.getJQueryRepresentation());
		return this.curentTableRowDiv;
	}
	
	renderRows() {
		var scope = this;
		this.rowDatas.forEach(function(entry){
			let row;
			row = scope.newRow();
			scope.renderRow(entry, row);
		});
		return this;
	}
}
export default SortableListTable;