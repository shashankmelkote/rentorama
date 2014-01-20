requirejs.config({
    //the paths config could be for a directory.
    paths: {
        jquery: 'jquery'
    }
});

requirejs(['jquery'], function($){
	$('#content').html('hello world this is my first module');
});