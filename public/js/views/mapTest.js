/**
 * New node file
 */


define(['Backbone', 'google'], function(backbone, Google){

	GoogleMapView = Backbone.View.extend({

		id: 'map',

		mapOptions: {
//			zoom: 12,
//			mapTypeId: google.maps.MapTypeId.ROADMAP,
//			center: new google.maps.LatLng(39.961201,-82.999491)
			zoom: 8
			//center: new google.maps.LatLng(-34.397, 150.644)
		},

		initialize: function() {
			var self = this;
			// utilize Geolocation for initial map center
			if(navigator.geolocation) {
				browserSupportFlag = true;
				navigator.geolocation.getCurrentPosition(function(position) {
//					initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
//					self.googleMap.setCenter(initialLocation);
				}, function() {
					this.handleNoGeolocation(browserSupportFlag);
				});

			} else {
				browserSupportFlag = false;
				this.handleNoGeolocation(browserSupportFlag);
			}
			this.render();
		},

		handleNoGeolocation: function(errorFlag) {
			if (errorFlag == true) {
				alert("Geolocation service failed");
			} else {
				alert("Your browser doesn't support Geolocation");
			}
			this.googleMap.setCenter(this.MapOptions.center);
		},


		render: function() {
			return this;
		}

	});

	return GoogleMapView;

});