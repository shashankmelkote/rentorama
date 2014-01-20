/**
 * New node file
 */


define([],function(){
	console.log('inside maps sample');
	
	// initialize function
	var initialize = function() { 
		return checkLogin(runApplication);
	};
	
	var initialize = function(){
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize2';
		document.body.appendChild(script);
	};
	
//	return 'message from sample';
	return {
		initialize: initialize
	};
});

var initialize2 = function() {
	var mapOptions = {
		zoom : 8,
		center : new google.maps.LatLng(-34.397, 150.644)
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
};