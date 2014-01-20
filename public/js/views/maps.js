
define(['text!templates/login.html'], function(loginTemplate) { 
	var MapView = Backbone.View.extend({
	    
        initialize: function() {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function() {
            var latlng = new google.maps.LatLng("-34.397", "150.644");
            var options = {
                zoom: 6,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.el, options);

            return this;
        }
    });
	
	return MapView;
});


