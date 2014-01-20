/**
 * New node file
 */

define(['Backbone', 'text!templates/landing.html', 'views/login', 'views/register'], function(backbone,landingTemplate, loginView, registerView){
	var landingView = Backbone.View.extend({

		el: $('#content'),
		
		LoginView: null,
		
		RegisterView: null,

		/*initialize:function(){
			_.bindAll(this,"login", "register");
		},

		events: {
			"submit .loginform": "login",
			"submit .registerForm": "register"
		},

		login: function() { 
			$.post('/login', {
				email: $('input[name=userid]').val(),
				password: $('input[name=password]').val()  
			}, 
			function(data) {
				console.log(data);
				window.location.hash = 'index';
			}).error(function(){
				$("#error").text('Unable to login.');
				$("#error").slideDown();
			});
			return false; 
		},

		register: function() { 
			$.post('/register', {
				firstName: $('input[name=firstName]').val(),
				lastName: $('input[name=lastName]').val(),
				email: $('input[name=email]').val(),
				password: $('input[name=password]').val(),
			}, 
			function(data) { 
				console.log(data);
			});

			return false; 
		},*/
		
		renderLogin : function(){
			console.log("inside renderLogin");
			this.LoginView = new loginView();
			this.$el.append(this.LoginView.$el);
			this.LoginView.render();
		},
		
		renderRegister : function() {
			this.RegisterView = new registerView();
			this.$el.append(this.RegisterView.$el);
			this.RegisterView.render();
		},

		render : function(){
			var template = _.template(landingTemplate);
			this.$el.html(template);
			$("#error").hide();
			this.renderLogin();
			this.renderRegister();
		}
		
	});

	return landingView;

});