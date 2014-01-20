define(['text!templates/register.html'], function(registerTemplate) { 
	var registerView = Backbone.View.extend({
		//el: $('#registerationArea'),
		
		events: {
			"submit form": "register"
		},
		
		register: function() { 
			
			if($('input[name=terms]').val() == 'on' && 
					($('input[name=rpassword]').val() == 
						$('input[name=cpassword]').val())){
				$.post('/register', {
					firstName: $('input[name=fname]').val(),
					lastName: $('input[name=lname]').val(),
					email: $('input[name=emailid]').val(),
					password: $('input[name=rpassword]').val()
				}, 
				function(data) {
					console.log(data);
					window.location.hash = 'index';
				}).error(function(){
					$("#error").text('Unable to create user.');
					$("#error").slideDown();
				});
			}
			
			return false; 
		},
		
		render: function() { 
			this.$el.html(registerTemplate);
		} 
	});
	return registerView; 
});