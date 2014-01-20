/**
 * New node file
 */


define(['Backbone', 'text!templates/landing.html', 'views/landing', 'views/index', 'views/mapTest', 'views/uploadApartment'],
		function(backbone, loginfile, landingView, IndexView, MapView, UploadView){

	var AppRouter = Backbone.Router.extend({
		// initialize current view to null
		currentView: null,

		routes: {
			"index": "index",
			"login": "onLogin",
			"register": "register",
			"forgotpassword": "forgotpassword",
			"map": "map",
			"upload": "upload",
			"posts/:id": "getPost",
			"*actions": "defaultRoute" // Backbone will try match the route above first
		},

		// change view method
		changeView: function(view) {
			//view.render();
			if ( null != this.currentView ) {
				this.currentView.undelegateEvents(); 
			}
			this.currentView = view;
			this.currentView.render();
		}
		
	});
	// Instantiate the router
	var app_router = new AppRouter;
	app_router.on('route:index', function () {
		// Note the variable in the route definition being passed in here
		//alert( "inside index router"); 
		this.changeView(new IndexView());
		//$('#content').html(IndexView);
	});
	app_router.on('route:onLogin', function () {
		// Note the variable in the route definition being passed in here
		//$('#content').html(loginfile);
		//landingView.undelegateEvents();
		//landingView.render();
		this.changeView(new landingView());
	});
	app_router.on('route:register', function () {
		// Note the variable in the route definition being passed in here
		console.log('inside register router');
		landingView.undelegateEvents();
		alert( "inside register router");   
	});
	
	app_router.on('route:upload', function () {
		this.changeView(new UploadView());
	});
	
	app_router.on('route:forgotpassword', function () {
		// Note the variable in the route definition being passed in here
		alert( "inside forgotpassword router");   
	});
	app_router.on('route:map', function () {
		
		if ( null != this.currentView ) {
			this.currentView.undelegateEvents(); 
		}
		this.currentView = null;
		
		//MapView;
		
//		var script = document.createElement('script');
//		script.type = 'text/javascript';
//		script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize2';
//		document.body.appendChild(script);
		
		
		// Note the variable in the route definition being passed in here
		//this.changeView(new MapView());
		alert( "inside map router");   
	});
	app_router.on('route:getPost', function (id) {
		// Note the variable in the route definition being passed in here
		alert( "Get post number " + id );   
	});
	app_router.on('route:defaultRoute', function (actions) {
		$('#content').html(loginfile);
		alert( actions ); 
	});

	return app_router;

	//return 'hello from the router';
});

//var initialize2 = function() {
//	
//	console.log('maps received');
//	
//	var mapOptions = {
//		zoom : 8,
//		center : new google.maps.LatLng(-34.397, 150.644)
//	};
//
//	var map = new google.maps.Map(document.getElementById('content'), mapOptions);
//};