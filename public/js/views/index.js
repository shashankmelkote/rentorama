define(['Backbone', 'text!templates/index.html', 'text!templates/login.html', 'text!templates/search.html',
    'text!templates/searchResults.html', 'text!templates/maps.html'],
    function(backbone, indexTemplate, loginTemplate, searchTemplate, searchResultsTemplate, mapTemplate) {

	var indexView = Backbone.View.extend({
		el : $('#content'),

		renderMap : function() {
			//			this.map = new mapView();
			//
			//			if(this.map){
			//				this.$el.append(this.map.$el2);
			//				console.log('calling maps');
			//				this.map.render();
			//				console.log('called maps');
			//				//this.$("#area2").html(this.map.render());
			//			} else {
			//				this.$("#area2").html("hello world");
			//			}
			//

			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize2';
			document.body.appendChild(script);

			// var templateMap = _.template(mapTemplate);
			// this.$("#area3").html(templateMap);
			// $("#error").hide();

		},

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
			//this.renderMap();
			
		}
	});

	var mapView = Backbone.View.extend({
		el2 : $('#area2'),

		render : function() {
			//			var template = _.template(indexTemplate);
			//			this.$el.html(template);
			//			$("#error").hide();
			//			this.renderInner();
			console.log('inside maps');
			//this.$el.html("hello world inside maps");
			//this.$("#area2").html("hello world inside maps render");

			this.$el2.html("hello world..this is a test");

			if (this.$("#area2").html("hello world inside maps render")) {
				console.log('not null');
				return "hello world inside maps";
			}
			return "this is null";
		}
	});

	return indexView;

}); 


var initialize2 = function() {
	
	console.log("inside bb maps received");
	
	var mapOptions = {
		zoom : 8,
		center : new google.maps.LatLng(-34.397, 150.644)
	};

	var map = new google.maps.Map(document.getElementById('area3'), mapOptions);
	
	//var map = new google.maps.Map(document.getElementById('viewArea'), mapOptions);
};