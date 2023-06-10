import SortableListTable from "../table/SortableListTable"
import Ingredient from "../../objects/Ingredient"
import $ from "jquery";

class IngedientList extends SortableListTable{
	constructor(config) {
		super(config);
		let scope = this;
		Ingredient.loadAll(function(ingredients){
				console.log(ingredients);
				scope.pushAll(ingredients);
			});
	}
	
	renderRow(ingredient, row) {
		console.log(ingredient);
		row.append($('<td>' + ingredient.name +'</td>'))
	}
	
	renderHeaderRow(headerRow) {
		headerRow.append($('<th>Name</th>'))
	}
}
export default IngedientList