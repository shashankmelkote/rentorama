/**
 * New node file
 */

define(['Backbone', 'text!templates/landing.html', 'text!templates/login.html',  'text!templates/register.html'], function(backbone,landingTemplate, loginTemplate, registerTemplate){
	var landingView = Backbone.View.extend({
		el: $('#content'),

		initialize:function(){
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
				password: $('input[name=password]').val()
			}, 
			function(data) { 
				console.log(data);
			});

			return false; 
		},
		
		renderLogin : function(){
			this.$("#loginArea").html(loginTemplate);
		},
		
		renderRegister : function() {
			this.$("#registerationArea").html(registerTemplate);
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