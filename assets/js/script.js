App = {
	gdata: '',
	current_election_index: 0,
	wiki_base: 'http://en.wikipedia.org/wiki/United_States_presidential_election,_',

	// caching
	$slider: $('#slide'),
	$election: $('#election'),
	$play: $('#play'),

	// timer
	timer: {
		id: '',
		duration: 1750,
		on: false,
		active_btn_class: 'dark_blue_bg'
	},

	// template
	template: {
		compiled: '',
		layout: $('#data_template').html()
	},

	init: function() {
		$.get('assets/data.json', function(data) {
			App.gdata = data;
			App.refresh_all(App.current_election_index);
			App.$slider.noUiSlider('init', {
				handles: 1,
			    scale: [0, App.gdata.length -1],
			    start: 0,
			    step: 1,
				end: function() {
					App.current_election_index = $(this).noUiSlider('value')[1];
					App.refresh_all(App.current_election_index);
				}
			});
			$('#range').text('The current data set starts in ' + App.gdata[0].year + ' and it ends in the year ' + App.gdata[App.gdata.length - 1].year + " that is " + App.gdata.length + " elections");

		})
	},

	// makes a string of classes
	make_selector: function(array_of_states) {
		return  "." + array_of_states.join(", .");
	},

	// adds a color class to a string jq selector composed of state classes
	color_states: function(index, color) {
		$(App.make_selector(index), App.$election).addClass(color);
	},

	// removes all color classes from all the states.
	// this list should be an array of color from the current election,
	// as those colors change, they should get added to the array
	reset_colors: function() {
		$('li', App.$election).removeClass('blue red yellow other');
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

	doT_template: function(){
		App.template.compiled = doT.template(App.template.layout);
	},

	render_template: function(value) {
		$('#data').html(App.template.compiled(App.gdata[value]));
	},

	timer_start: function() {
		if ((App.current_election_index < App.gdata.length - 1) && (App.timer.on == true)) {
			App.current_election_index++;
			App.timer.id = setTimeout(function() {
			App.$slider.noUiSlider("move", {
				to: App.current_election_index
			});
			App.timer_start();
			}, App.timer.duration);
		} else {
			App.timer.on == false;
			App.$play.removeClass(App.timer.active_btn_class);
		}
	},

	timer_stop: function() {
		clearTimeout(App.timer.id);
		App.timer.on = false;
	},

	// in charge of updating the whole page
	refresh_all: function(value) {
		App.reset_colors();
		App.color_all(value);
		App.change_year(value);
		App.wiki_url(value);
		App.doT_template();
		App.render_template(value);
	},
};

$('#next').on('click', function(){
	App.current_election_index++;
	App.$slider.noUiSlider("move", {
		to: App.current_election_index
	});
});

$('#prev').on('click', function(){
	App.current_election_index--;
	App.$slider.noUiSlider("move", {
		to: App.current_election_index
	});
});

App.$play.on('click', function(){
	// so it doesnt add multiple timers
	if (App.timer.on == false) {
		App.timer.on = true;
		App.timer_start();
	}
	App.$play.addClass(App.timer.active_btn_class);
});

$('#stop').on('click', function(){
	App.timer.on = false;
	App.timer_stop();
	App.$play.removeClass(App.timer.active_btn_class);
});

$('#restart').on('click', function() {
	App.timer.on = false;
	App.current_election_index = 0;
	App.$slider.noUiSlider("move", {
		to: 0
	});
});



App.init();