import Misc from "./Misc"
import IngedientList from "./ingredient/IngredientList"

class LandingPage {
	
	constructor(){
		
	}
	
	render(){
		let mainContet = Misc.getMainContent();
		mainContet.append("Hello");
		let ingedientList = IngedientList.new
		mainContet.append(ingedientList.getJQueryRepresentation());
		
	}
}
export default LandingPage;