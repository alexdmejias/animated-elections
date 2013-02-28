require.config({
    baseUrl: '/assets/js',

    paths: {
        // underscore: 'assets/js/components/underscore/underscore-min',
        // jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
        jquery: 'components/jquery/jquery.min',
        backbone: '../js/components/backbone/backbone-min'
    },

    shim: {
        'backbone': {
            deps: ['../js/components/underscore/underscore', 'jquery'],
            exports: 'Backbone'
        }
    }

});

require(['views/app'], function(App) {

    var router = Backbone.Router.extend({
        routes: {
            '': 'root'
        },

        root: function() {
            new App();
        }
    });

    r = new router();
    Backbone.history.start();
});