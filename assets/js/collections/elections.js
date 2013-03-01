define(['backbone', 'assets/js/models/election.js'], function(Backbone, Election) {
    var Elections = Backbone.Collection.extend({
        model: Election,
        url: '/assets/data.json'
    });

    return Elections;
});