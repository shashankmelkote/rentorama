/**
 * New node file
 */

define(['views/index', 'views/register', 'views/login', 'views/forgotpassword'], 
		function(IndexView, RegisterView, LoginView, ForgotPasswordView) {

	var SocialRouter = Backbone.Router.extend({
		// initialize current view to null
		currentView: null,

		// define routes
		routes: {
			"index": "index",
			"login": "login",
			"register": "register",
			"forgotpassword": "forgotpassword"
		},

		// change view method
		changeView: function(view) {
			if ( null != this.currentView ) {
				this.currentView.undelegateEvents(); 
			}
			this.currentView = view;
			this.currentView.render(); 
		},

		// define index view call
		index: function() { 
			this.changeView(new IndexView());
		},

		// define login view call
		login: function() { 
			this.changeView(new LoginView());
		},

		// define forgot password view call
		forgotpassword: function() { 
			this.changeView(new ForgotPasswordView());
		},

		// define register new user view call
		register: function() { 
			this.changeView(new RegisterView());
		} 
	});
	
	// return router
	return new SocialRouter(); 
});