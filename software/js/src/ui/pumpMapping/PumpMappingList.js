import SortableListTable from "../table/SortableListTable"
import PumpMapping from "../../objects/PumpMapping"
import $ from "jquery";

class PumpMappingList extends SortableListTable{
	constructor(config) {
		super(config);
		let scope = this;
		PumpMapping.loadAll(function(pump){
				scope.pushAll(pump);
			});
	}
	
	renderRow(pumpMapping, row) {
		row.append($('<td>' + pumpMapping.pumpId +'</td>'))
		row.append($('<td>' + pumpMapping.ingredientId +'</td>'))
		row.append($('<td>' + pumpMapping.getIngredient().name +'</td>'))
	}
	
	renderHeaderRow(headerRow) {
		headerRow.append($('<th>Pump Id</th>'))
		headerRow.append($('<th>Ingredient Id</th>'))
		headerRow.append($('<th>Ingredient Name</th>'))
	}
}
export default PumpMappingList