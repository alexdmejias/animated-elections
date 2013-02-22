// main App(v) renders most of the page and calls a collection.
// the collection gets the data and returns one model, the one currently being looked at
// the model gives the data back to the main view


var Election = Backbone.Model.extend({});

var Elections = Backbone.Collection.extend({
	ind: 0,
	model: Election,
	url: '/assets/data.json',

	initialize: function() {
		// console.log(this.model.get('year'));
		// return this;
	},

	render: function() {
		// return this;
	}

});




var ElectionView = Backbone.View.extend({
	initialize: function() {
		// this.model.on('change', this.render, this)
		this.render();
	},

	render: function() {
		console.log(this.model.get('year'));
		return this;
	}
});






var App = Backbone.View.extend({
	current_election_index: 0,
	el: 'body',
	initialize: function() {
		var elections = new Elections();
		elections.fetch({
			success: function () {
				var view = new ElectionView({model: elections.at(0)})
			}
		});
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
