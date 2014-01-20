/**
 * New node file
 */


define(['routerSample','text!index.html'],function(router, file){
	console.log('inside sample');
	
	// initialize function
	var initialize = function() { 
		return checkLogin(runApplication);
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
			$('#content').html('testing sample login failure');
			window.location.hash = 'login'; 
		}else{
			window.location.hash = 'index';
		}
		
	    // Start Backbone history a necessary step for bookmarkable URL's
	    Backbone.history.start();
	    
	};
	
	
//	return 'message from sample';
	return {
		initialize: initialize 
	};
});