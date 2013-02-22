// main App(v) renders most of the page and calls a collection.
// the collection gets the data and returns one model, the one currently being looked at
// the model gives the data back to the main view
// TODO: BREAK DOWN INTO SMALLER FILES WIT REQUIREJS

var Election = Backbone.Model.extend({});

var Elections = Backbone.Collection.extend({
    model: Election,
    url: '/assets/data.json',

    initialize: function() {
    },

    render: function() {
    }

});




var ElectionView = Backbone.View.extend({
    wiki_base: 'http://en.wikipedia.org/wiki/United_States_presidential_election,_',

    initialize: function() {
        this.render();
    },

    render: function() {
        this.update_wiki_link();
        this.update_heading();

        return this;
    },

    update_wiki_link: function() {
        $('#wiki').attr('href', this.wiki_base + this.model.get('year'));
    },

    update_heading: function() {
        $('#year').html(this.model.get('year'));
    },


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
        'click #next': 'next',
        'click #prev': 'prev'
    },

    change_election_index: function(prev) {
        return typeof prev === 'undefined' ? this.current_election_index++: this.current_election_index--;
    },

    next: function() {
        // add an indicator to show they cant go in this direction anymroe
        if (this.current_election_index + 1 != elections.length) {
            this.change_election_index();
            this.render();
        }
    },

    prev: function() {
        // add an indicator to show they cant go in this direction anymroe
        if (this.current_election_index != 0 ) {
            this.change_election_index(prev);
            this.render();
        }
    }

});

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
