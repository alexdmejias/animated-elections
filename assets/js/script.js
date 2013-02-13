gdata ='';
election = 0;
slider = $("#slider");
$.get('assets/data.json', function(data) {
	gdata = data;
	refresh_all(election);
	$(slider).slider( "option", "max", gdata.length - 1);
	$('#range').text('The data set starts in ' + gdata[0].year + ' and it ends in the year ' + gdata[gdata.length - 1].year);
});

function make_selector(arr) {
	return  "." + arr.join(", .");
}

function color_states(index, color, is_class) {
	is_class = typeof a !== 'undefined' ? a: true
	$(make_selector(index)).addClass(color);
}

function reset() {
	$('#election li').removeClass('blue red yellow other');
}

function color_all(index) {
	for(var party in gdata[index].parties) {
		color_states(gdata[index].parties[party], party);
	}
}

function change_year(election) {
	$('#year').text(gdata[election].year);
}

function refresh_all(value) {
	reset();
	color_all(value);
	change_year(value);
}

$('#next').on('click', function(){
	election++;
	$("#slider").slider("value", election);
	refresh_all(election);
});

$('#prev').on('click', function(){
	election--;
	$("#slider").slider("value", election);
	refresh_all(election);
});

$(slider).slider({
	range: false,
	min: 0,
	step: 1,
	animate: "fast",
	change: function(event, ui) {
		election = ui.value;
		refresh_all(election);
	}
});