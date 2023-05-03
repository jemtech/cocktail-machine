import Misc from "./Misc"

class LandingPage {
	
	constructor(){
		
	}
	
	render(){
		let mainContet = Misc.getMainContent();
		mainContet.append("Hello");
	}
}
export default LandingPage;