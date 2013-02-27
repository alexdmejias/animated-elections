require.config({
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },

    baseUrl: '/assets/js'
});

require(['views/app'], function(App) {

    var router = Backbone.Router.extend({
        routes: {
            '': 'root'
        },

        root: function(){
            new App();
        }
    });

    var r = new router();
    Backbone.history.start();
});