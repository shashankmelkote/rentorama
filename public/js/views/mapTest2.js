/**
 * New node file
 */

define([], function(){

	Map = Backbone.Model.extend({
		defaults: {
			id: '', currentLatLng: {}, mapOptions: {}, map: {},
			position: {}, zoom: 13, maxZoom: 16, minZoom: 12
		},
		initMap: function(position){
			this.set('position', position);
			var currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			this.set('currentLatLng', currentLatLng);
			var mapOptions = {
					zoom: this.get('zoom'),
					minZoom: this.get('minZoom'),
					maxZoom: this.get('maxZoom'),
					center: currentLatLng,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					mapTypeControl: false
			};
			this.set('mapOptions', mapOptions);
		}
	});
	
	MapView = Backbone.View.extend({
	    defaults:{
	       region: 'us', language: 'en'
	    },
	    id: 'gmaps-container',
	    className: 'gmaps_container',
	    initialize: function(){
	       var url = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false";
	       $.ajax({
	           url: url,
	           dataType: "script",
	           async: false,
	           success: function(){
	               console.log('script loaded');
	           }
	       });
	       this.model.set('map', new google.maps.Map(this.el, this.model.get('mapOptions')));
	    },
	    render: function(){
	        console.log('init map');
	        $('#' + this.id).replaceWith(this.el);
	        return this;
	    }
	});
	
	console.log('inside maps backbone');
	
	var map = new Map({zoom: 8, maxZoom: 18, minZoom: 8});
    map.initMap({coords: {latitude: -34.397, longitude: 150.644}});
    var mapView = new MapView({model: map});
    mapView.render();
    
});


