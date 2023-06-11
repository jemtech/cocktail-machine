import SortableListTable from "../table/SortableListTable"
import Pump from "../../objects/Pump"
import $ from "jquery";

class PumpList extends SortableListTable{
	constructor(config) {
		super(config);
		let scope = this;
		Pump.loadAll(function(pump){
				scope.pushAll(pump);
			});
	}
	
	renderRow(pump, row) {
		row.append($('<td>' + pump.id +'</td>'))
	}
	
	renderHeaderRow(headerRow) {
		headerRow.append($('<th>Id</th>'))
	}
}
export default PumpList