import SortableListTable from "../table/SortableListTable"
import Recipe from "../../objects/Recipe"
import $ from "jquery";
import Event from "../../misc/Event"

class RecipeList extends SortableListTable{
	constructor(config) {
		super(config);
		let scope = this;
		Recipe.loadAll(function(recipes){
				scope.pushAll(recipes);
			});
	}
	
	renderRow(recipe, row) {
		row.append($('<td>' + recipe.name +'</td>'));
		let prepRecipe = $('<td></td>');
		prepRecipe.append(this.createPrepRecipeButton(recipe));
		row.append(prepRecipe);
	}
	
	createPrepRecipeButton(recipe){
		let prepareButton = $('<button type="submit" class="btn btn-primary mb-3">Prepare</button>')
		let scope = this;
		prepareButton.click(function(event){
			recipe.prepare(function(pumpMapping){
				let event = new Event({
					type: Event.RECIPE_PREPARED,
					data: pumpMapping
				});
				scope.notify(event);
			});
		});
		return prepareButton;
	}
	
	renderHeaderRow(headerRow) {
		headerRow.append($('<th>Name</th>'))
		headerRow.append($('<th>Action</th>'))
	}
}
export default RecipeList