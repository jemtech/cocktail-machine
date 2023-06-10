import SortableListTable from "../table/SortableListTable"
import Ingredient from "../../objects/Ingredient"
import $ from "jquery";

class IngedientList extends SortableListTable{
	constructor(config) {
		super(config);
		Ingredient.loadAll(function(ingredients){
				this.pushAll(ingredients);
			});
	}
	
	renderRow(ingredient, row) {
		row.append($('<td>' + ingredient.name +'</td>'))
	}
	
	renderHead() {
		this.header.append($('<th>Name</th>'))
	}
}
export default IngedientList