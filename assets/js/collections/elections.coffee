define ['backbone', 'assets/js/models/election.js'], (Backbone, Election) ->
	Elections = Backbone.Collection.extend(
		model: Election
		url: 'assets/data.min.json'
	)

	Elections
