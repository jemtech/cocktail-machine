import SortableListTable from "../table/SortableListTable"
import Ingredient from "../../objects/Ingredient"
import $ from "jquery";

class IngedientList extends SortableListTable{
	constructor(config) {
		super(config);
		let scope = this;
		Ingredient.loadAll(function(ingredients){
				scope.pushAll(ingredients);
			});
	}
	
	renderRow(ingredient, row) {
		row.append($('<td>' + ingredient.name +'</td>'))
	}
	
	renderHeaderRow(headerRow) {
		headerRow.append($('<th>Name</th>'))
	}
}
export default IngedientList