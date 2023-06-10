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

	static addToInfo(){
		var infoDiv = $('#info_div');
		if(! infoDiv.length){
			var mainContent = $('.main_content');
			if(mainContent.length){
				mainContent.prepend('<div id="info_div" class="info_box"></div>');
				infoDiv = $('#info_div');
			}else{
				console.log('main_contet not found');
				return;
			}
		}
		var infoTable = infoDiv.children('table');
		if(! infoTable.length){
			infoDiv.append('<table class="noborder"></table>');
			infoTable = infoDiv.children('table');
		}
		
		var infoTableBody = infoTable.children('tbody');
		if(! infoTableBody.length){
			infoTable.append('<tbody></tbody>');
			infoTableBody = infoTable.children('tbody');
		}
		var i;
		for (i = 0; i < arguments.length; i++) {
			infoTableBody.append('<tr><td>' + arguments[i] + '</tr></td>');
		}
	}

	static addToError(){
		var errorDiv = $('#error_div');
		if(! errorDiv.length){
			var mainContent = $('.main_content');
			if(mainContent.length){
				mainContent.prepend('<div id="error_div" class="error_box"></div>');
				errorDiv = $('#error_div');
			}else{
				console.log('main_contet not found');
				return;
			}
		}
		var errorTable = errorDiv.children('table');
		if(! errorTable.length){
			errorDiv.append('<table class="noborder"></table>');
			errorTable = errorDiv.children('table');
		}
		
		var errorTableBody = errorTable.children('tbody');
		if(! errorTableBody.length){
			errorTable.append('<tbody></tbody>');
			errorTableBody = errorTable.children('tbody');
		}
		var i;
		for (i = 0; i < arguments.length; i++) {
			errorTableBody.append('<tr><td>' + arguments[i] + '</tr></td>');
		}
	}

	static cleanError(){
		var errorDiv = $('#error_div');
		if(errorDiv){
			errorDiv.html('');
		}
	}

	static cleanInfo(){
		var errorDiv = $('#info_div');
		if(errorDiv){
			errorDiv.html('');
		}
	}
}
export default Misc;