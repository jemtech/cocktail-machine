import SortableListTable from "../table/SortableListTable"
import Recipe from "../../objects/Recipe"
import $ from "jquery";
import Event from "../../misc/Event"
import ShowModal from "./ShowModal"

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
		prepRecipe.append(this.createShowRecipeButton(recipe));
		prepRecipe.append(this.createPrepRecipeButton(recipe));
		row.append(prepRecipe);
	}
	
	createShowRecipeButton(recipe){
		let showButton = $('<button type="button" class="btn btn-primary">Show</button>')
		let scope = this;
		showButton.click(function(event){
			let showModal = new ShowModal({recipe: recipe});
			scope.append(showModal);
		});
		return showButton;
	}
	
	createPrepRecipeButton(recipe){
		let prepareButton = $('<button type="button" class="btn btn-primary">Prepare</button>')
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