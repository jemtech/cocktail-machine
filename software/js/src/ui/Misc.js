import $ from "jquery";

class Misc{
	static getMainContent() {
		let mainContent = $('.main_content');
		if(!mainContent.length){
			console.log('main_contet not found');
			return null;
		}
		return mainContent
	}
}
export default Misc;