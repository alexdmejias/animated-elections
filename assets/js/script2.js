// main App(v) renders most of the page and calls a collection.
// the collection gets the data and returns one model, the one currently being looked at
// the model gives the data back to the main view


var Election = Backbone.Model.extend({});

var Elections = Backbone.Collection.extend({
    ind: 0,
    model: Election,
    url: '/assets/data.json',

    initialize: function() {
    },

    render: function() {
    }

});




var ElectionView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },

    render: function() {
        $('#year').html(this.model.get('year'));
        return this;
    }
});





var App = Backbone.View.extend({
    current_election_index: 0,
    el: 'body',
    initialize: function() {
        elections = new Elections();
        _.bindAll(this, 'render');
        this.listenTo(elections, 'reset', this.render);
        elections.fetch();
    },

    render: function () {
        var view = new ElectionView({model: elections.at(this.current_election_index)})
        return this;
    },

    events: {
        'click #next': 'inc_election_index'
    },

    inc_election_index: function() {
        this.current_election_index++;
        this.render();
    }
})

var router = Backbone.Router.extend({
    routes: {
        '': 'root',
        'elections/:id': 'year'
    },

    root: function(){
        new App();
    },

    year: function(year) {
        var collection = new Elections();
        return collection.at(year);
    }
});
var r = new router();
Backbone.history.start();
