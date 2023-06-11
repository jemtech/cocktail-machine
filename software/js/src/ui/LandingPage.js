import Misc from "./Misc"
import IngredientUi from "./ingredient/IngredientUi"
import RecipeUi from "./recipe/RecipeUi"
import PumpUi from "./pump/PumpUi"
import PumpMappingUi from "./pumpMapping/PumpMappingUi"

class LandingPage {
	
	constructor(){
		
	}
	
	render(){
		let mainContet = Misc.getMainContent();
		let recipeUi = new RecipeUi()
		mainContet.append(recipeUi.getJQueryRepresentation());
		let ingredientUi = new IngredientUi()
		mainContet.append(ingredientUi.getJQueryRepresentation());
		let pumpUi = new PumpUi()
		mainContet.append(pumpUi.getJQueryRepresentation());
		let pumpMappingUi = new PumpMappingUi()
		mainContet.append(pumpMappingUi.getJQueryRepresentation());
	}
}
export default LandingPage;