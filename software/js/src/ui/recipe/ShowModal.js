import UiElement from "../UiElement";
import $ from "jquery";

class ShowModal extends UiElement {
	constructor(config) {
		super(config);
		if (config) {
			if (config.recipe) {
				this.setRecipe(config.recipe);
			}
		}
		
		this.baseElement = $('<div class="modal" tabindex="-1">></div>');
		super.setBaseJQueryObject(this.baseElement);
		this.modalDialog = $('<div class="modal-dialog"></div>');
		this.baseElement.append(this.modalDialog);
		this.modalContent = $('<div class="modal-content"></div>');
		this.modalDialog.append(this.modalContent);
		this.modalHeader = $('<div class="modal-header"></div>');
		this.modalContent.append(this.modalHeader);
		this.modalTitel = $('<h5 class="modal-title">' + this.recipe.name + '</h5>');
		this.modalHeader.append(this.modalTitel);
		this.modalTitelClose = $('<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>');
		this.modalHeader.append(this.modalTitelClose)
		let scope = this;
		this.modalTitelClose.click(function(event){
			scope.remove();
		});
		this.modalBody = $('<div class="modal-body"></div>');
		this.modalContent.append(this.modalBody)
		this.modalFooter = $('<div class="modal-footer"></div>');
		this.modalContent.append(this.modalFooter)
		this.modalFooterClose = $('<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>');
		this.modalFooterClose.click(function(event){
			scope.remove();
		});
		this.modalFooter.append(this.modalFooterClose);
		renderPrepRecipeButton();
		
		
		this.baseElement.append($('<h2>Recipes</h2>'));
		this.recipeList = new RecipeList();
		this.append(this.recipeList);
		this.renderNewRecipeButton();
	}
	
	renderPrepRecipeButton(){
		this.modalFooterPrepareButton = $('<button type="button" class="btn btn-primary">Prepare</button>')
		this.modalFooter.append(this.modalFooterPrepareButton);
		let scope = this;
		this.modalFooterPrepareButton.click(function(event){
			scope.recipe.prepare(function(pumpMapping){
				let event = new Event({
					type: Event.RECIPE_PREPARED,
					data: pumpMapping
				});
				scope.notify(event);
			});
		});
	}
      
	
	setRecipe(recipe){
		this.recipe = recipe;
		if(this.modalTitel){
			this.modalTitel.text(this.recipe.name);
		}
	}
}
export default ShowModal;