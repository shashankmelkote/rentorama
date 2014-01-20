define(['Backbone'], function(backbone){
	
	var mapView = Backbone.View.extend({
		el: $('#content'),
		
		
		render : function(){
			var template = _.template(indexTemplate);
			this.$el.html(template);
			$("#error").hide();
			this.renderInner();
		}
	});
	
	return "hello world";
	
});