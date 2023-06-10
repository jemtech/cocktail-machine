import SortableList from "../../misc/SortableList";
import UiElement from "../UiElement";
import $ from "jquery";

class SortableListTable extends UiElement {
	constructor(config) {
		super(config);
		this.baseElement = $('<table></table>');
		super.setBaseJQueryObject(this.baseElement);
		this.rowDatas = new SortableList();
	}
	
	renderEmpty() {
		this.clear();
		this.renderHeader()
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
	
	renderHeader() {
		this.header = $('<thead></thead>');
		this.baseElement.append(this.header);
		this.headerRow = $('<tr></tr>');
		this.renderHeaderRow(this.headerRow);
		this.header.append(this.headerRow);
	}
	
	renderHeaderRow(headerRow) {
		throw new Error("please override renderHeaderRow(headerRow)");
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