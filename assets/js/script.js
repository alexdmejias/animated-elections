App = {
	gdata: '',
	current_election_index: 0,
	slider: $('#slider'),
	wiki_base: 'http://en.wikipedia.org/wiki/United_States_presidential_election,_',
	get: $.get('assets/data.json', function(data) {
			App.gdata = data;
			App.refresh_all(App.current_election_index);
			$(slider).slider( "option", "max", App.gdata.length - 1);
			$('#range').text('The current data set starts in ' + App.gdata[0].year + ' and it ends in the year ' + App.gdata[App.gdata.length - 1].year + " that is " + App.gdata.length + " elections");
	}),
	init: function() {

	},

	// makes a string of classes
	make_selector: function(array_of_states) {
		return  "." + array_of_states.join(", .");
	},

	// adds a color class to a string jq selector composed of state classes
	color_states: function(index, color) {
		$(App.make_selector(index)).addClass(color);
	},

	// removes all color classes from all the states.
	// this list should be an array of color from the current election,
	// as those colors change, they should get added to the array
	reset_colors: function() {
		$('#election li').removeClass('blue red yellow other');
	},

	// @index = index of the data var
	// color all the states per election
	color_all: function(party_index) {
		for(var party in App.gdata[party_index].parties) {
			App.color_states(App.gdata[party_index].parties[party].states, App.gdata[party_index].parties[party].color);
		}
	},

	// changes the year in the heading
	change_year: function(current_election_index) {
		$('#year').text(App.gdata[current_election_index].year);
	},

	// changes the url for the wiki page
	wiki_url: function(current_election_index) {
		$('#wiki').attr('href', App.wiki_base + App.gdata[current_election_index].year);
	},

	// in charge of updating the whole page
	refresh_all: function(value) {
		App.reset_colors();
		App.color_all(value);
		App.change_year(value);
		App.wiki_url(value);
	},
};

$('#next').on('click', function(){
	App.current_election_index++;
	$(App.slider).slider("value", App.current_election_index);
	App.refresh_all(App.current_election_index);
});

$('#prev').on('click', function(){
	App.current_election_index--;
	$(App.slider).slider("value", App.current_election_index);
	App.refresh_all(App.current_election_index);
});

$(App.slider).slider({
	range: false,
	min: 0,
	step: 1,
	animate: "fast",
	change: function(event, ui) {
		App.current_election_index = ui.value;
		App.refresh_all(App.current_election_index);
	}
});
