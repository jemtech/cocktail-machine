class Objects{
	static save(entry, callback, endpoint){
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
					UI.addToError(jqXHR.responseText);
				}
			}
		});
	}
	
	static post(entry, callback, endpoint, scope){
		endpoint = Objects.rootURL + endpoint;
		$.ajax({   
			type: "POST",
			url: endpoint,
			data: JSON.stringify(entry),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				if(callback){
					if (scope) {
						callback.call(scope, data);
					} else {
						callback(data);
					}
				}
			},
			error: function(jqXHR, textStatus, errorThrown ) {
				if(jqXHR.status != 401){
					UI.addToError(jqXHR.responseText);
				}
				if (scope) {
					if (scope.errorCallBack) {
						scope.errorCallBack();
					}
				}
			}
		});
	}
	
	static load(callback, endpoint, async, errorHandler){
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
					UI.addToError(jqXHR.responseText);
				}
				if(errorHandler){
					errorHandler();
				}
			}
		});
	}
	
	static remove(callback, endpoint){
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
					UI.addToError(jqXHR.responseText);
				}
			}
		});
	}
}

Objects.rootURL = "/api/";
export default Objects;