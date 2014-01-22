define(['Backbone', 'text!templates/index.html', 'text!templates/search.html',
    'text!templates/searchResults.html'],
    function(backbone, indexTemplate, searchTemplate, searchResultsTemplate) {

	var searchView = Backbone.View.extend({
		el : $('#content'),

		renderMenuBar : function() {
			var templateSearch = _.template(searchTemplate);
			this.$("#area1").html(templateSearch);
			$("#error").hide();
		},

		renderMapsBox : function() {
			var templateSearchResults = _.template(searchResultsTemplate);
			this.$("#area2").html(templateSearchResults);
			$("#error").hide();
		},

		render : function() {
			var template = _.template(indexTemplate);
			this.$el.html(template);
			$("#error").hide();
			this.renderMenuBar();
			this.renderMapsBox();

		}
	});

	return searchView;
});