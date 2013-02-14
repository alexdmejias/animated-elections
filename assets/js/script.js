App = {
	gdata: '',
	current_election_index: 0,
	slider: $('#slider'),
	wiki_base: 'http://en.wikipedia.org/wiki/United_States_presidential_election,_',
	get: $.get('assets/data.json', function(data) {
			App.gdata = data;
			App.refresh_all(App.current_election_index);
			$(slider).slider( "option", "max", App.gdata.length - 1);
			$('#range').text('The current data set starts in ' + App.gdata[0].year + ' and it ends in the year ' + App.gdata[App.gdata.length - 1].year);
	}),
	init: function() {

	},

	// makes a string of classes
	make_selector: function(arr) {
		return  "." + arr.join(", .");
	},

	// given the an index, it will find and color all of the given states
	color_states: function(index, color, is_class) {
		// is_class = typeof a !== 'undefined' ? a: true
		$(App.make_selector(index)).addClass(color);
	},

	// removes all color classes from all the states
	reset_colors: function() {
		$('#election li').removeClass('blue red yellow other');
	},

	// @index = index of the data var
	// color all the states per election
	color_all: function(index) {
		for(var party in App.gdata[index].parties) {
			App.color_states(App.gdata[index].parties[party], party);
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
	refresh_all(App.current_election_index);
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
