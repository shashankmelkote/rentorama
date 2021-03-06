requirejs.config({
    //the paths config could be for a directory.
    paths: {
        jquery: 'libs/jquery',
        Underscore: 'libs/underscore',
        Backbone: 'libs/backbone',
        text: 'libs/text',
        templates: 'templates',
        google: 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false'
    },

    shim: {
        'Backbone': ['Underscore', 'jquery'],
        'SocialNet': ['Backbone'],
        'sample': ['Backbone']

    }
});

requirejs(['jquery', 'sample', 'text!index.html', 'Backbone', 'libs/jquery.fileupload'],
    function ($, sample, file, backbone, upload) {
        sample.initialize();
    });