/*define(['view/index'], function(indexView) {
	var initialize = function(){
		indexView.render();
	};
	return {
		initialize: initialize
	};
});*/


define(['router'], function(router) { 

	// initialize function
	var initialize = function() { 
		checkLogin(runApplication);
	};

	// define check login
	var checkLogin = function(callback) { 
		$.ajax("/account/authenticated", {
			method: "GET", success: function() {
				return callback(true); 
			},
			error: function(data) { 
				return callback(false);
			} 
		});
	};

	// define method run application
	var runApplication = function(authenticated) { 
		if (!authenticated) {
			window.location.hash = 'login'; 
		}else{
			window.location.hash = 'index';
		}
		Backbone.history.start();
	};

	// call initialize and return
	return {
		initialize: initialize
	}; 
});