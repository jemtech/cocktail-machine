import Misc from "./Misc"
import IngredientUi from "./ingredient/IngredientUi"
import RecipeUi from "./recipe/RecipeUi"

class LandingPage {
	
	constructor(){
		
	}
	
	render(){
		let mainContet = Misc.getMainContent();
		let recipeUi = new RecipeUi()
		mainContet.append(recipeUi.getJQueryRepresentation());
		let ingedientUi = new IngredientUi()
		mainContet.append(ingedientUi.getJQueryRepresentation());
	}
}
export default LandingPage;