import SortableListTable from "../table/SortableListTable"
import Recipe from "../../objects/Recipe"
import $ from "jquery";

class RecipeList extends SortableListTable{
	constructor(config) {
		super(config);
		let scope = this;
		Recipe.loadAll(function(recipes){
				scope.pushAll(recipes);
			});
	}
	
	renderRow(recipes, row) {
		row.append($('<td>' + recipes.name +'</td>'))
	}
	
	renderHeaderRow(headerRow) {
		headerRow.append($('<th>Name</th>'))
	}
}
export default RecipeList