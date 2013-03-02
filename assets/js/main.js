require.config({

    paths: {
        jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
        backbone: '../js/components/backbone/backbone-min',
        jqueryui: 'components/jqueryui/jquery-ui-1.10.1.custom.min'
    },

    shim: {
        'backbone': {
            deps: ['../js/components/underscore/underscore-min', 'jquery'],
            exports: 'Backbone'
        },

        'jqueryui': ['jquery']
    }

});

require(['views/app'], function(App) {

    var router = Backbone.Router.extend({
        routes: {
            '': 'root',
            'year(/:year)/': 'year'
        },

        root: function() {
            new App();
        },

        year: function() {
            new App({
                // year: year
            });
        }
    });

    r = new router();
    Backbone.history.start({
        pushState: true
    });
});