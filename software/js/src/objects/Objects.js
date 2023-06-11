import $ from "jquery";
import Misc from "../ui/Misc"

class Objects{
	static save(entry, callback, endpoint, errorCallBack){
		endpoint = Objects.rootURL + endpoint;
		$.ajax({   
			type: "PUT",
			url: endpoint,
			data: JSON.stringify(entry),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				if(callback){
					callback(data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown ) {
				if(jqXHR.status != 401){
					Misc.addToError(jqXHR.responseText);
				}
				if (errorCallBack) {
					errorCallBack(jqXHR.responseText)
				}
			}
		});
	}
	
	static put(entry, callback, endpoint, errorCallBack){
		endpoint = Objects.rootURL + endpoint;
		$.ajax({   
			type: "PUT",
			url: endpoint,
			data: JSON.stringify(entry),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				if(callback){
					callback(data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown ) {
				if(jqXHR.status != 401){
					Misc.addToError(jqXHR.responseText);
				}
				if (errorCallBack) {
					errorCallBack(jqXHR.responseText)
				}
			}
		});
	}
	
	static post(entry, callback, endpoint, errorCallBack){
		endpoint = Objects.rootURL + endpoint;
		$.ajax({   
			type: "POST",
			url: endpoint,
			data: JSON.stringify(entry),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				if(callback){
					callback(data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown ) {
				if(jqXHR.status != 401){
					Misc.addToError(jqXHR.responseText);
				}
				if (errorCallBack) {
					errorCallBack(jqXHR.responseText)
				}
			}
		});
	}
	
	static load(callback, endpoint, async, errorCallBack){
		if (async == null) {
			async = true;
		}
		endpoint = Objects.rootURL + endpoint;
		$.ajax({   
			type: "GET",
			url: endpoint,
			dataType: "json",
			async: async,
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				callback(data);
			},
			error: function(jqXHR, textStatus, errorThrown ) {
				if(jqXHR.status != 401){
					Misc.addToError(jqXHR.responseText);
				}
				if (errorCallBack) {
					errorCallBack(jqXHR.responseText)
				}
			}
		});
	}
	
	static remove(callback, endpoint, errorCallBack){
		endpoint = Objects.rootURL + endpoint;
		$.ajax({
			type: "DELETE",  
			url: endpoint,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				callback(data);
			},
			error: function(jqXHR, textStatus, errorThrown ) {
				if(jqXHR.status != 401){
					Misc.addToError(jqXHR.responseText);
				}
				if (errorCallBack) {
					errorCallBack(jqXHR.responseText)
				}
			}
		});
	}
}

Objects.rootURL = "/api/";
export default Objects;