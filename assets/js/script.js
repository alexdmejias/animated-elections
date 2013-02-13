App = {
	gdata: '',
	election: 0,
	slider: $('#slider'),
	get: $.get('assets/data.json', function(data) {
			App.gdata = data;
			App.refresh_all(App.election);
			$(slider).slider( "option", "max", App.gdata.length - 1);
			$('#range').text('The data set starts in ' + App.gdata[0].year + ' and it ends in the year ' + App.gdata[App.gdata.length - 1].year);
	}),
	make_selector: function(arr) {
		return  "." + arr.join(", .");
	},

	color_states: function(index, color, is_class) {
		is_class = typeof a !== 'undefined' ? a: true
		$(App.make_selector(index)).addClass(color);
	},

	reset: function () {
		$('#election li').removeClass('blue red yellow other');
	},

	color_all: function (index) {
		for(var party in App.gdata[index].parties) {
			App.color_states(App.gdata[index].parties[party], party);
		}
	},

	change_year: function (election) {
		$('#year').text(App.gdata[election].year);
	},

	refresh_all: function (value) {
		App.reset();
		App.color_all(value);
		App.change_year(value);
	},
};

$('#next').on('click', function(){
	App.election++;
	$(App.slider).slider("value", App.election);
	App.refresh_all(App.election);
});

$('#prev').on('click', function(){
	App.election--;
	$(App.slider).slider("value", App.election);
	refresh_all(App.election);
});

$(App.slider).slider({
	range: false,
	min: 0,
	step: 1,
	animate: "fast",
	change: function(event, ui) {
		App.election = ui.value;
		App.refresh_all(App.election);
	}
});