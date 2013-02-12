gdata ='';
election = 0;
$.get('assets/data.json', function(data) {
	gdata = data;
	color_all(election);
	change_year(election);
});

function make_selector(arr) {
	return  "." + arr.join(", .");
}

function color_states(index, color, is_class) {
	is_class = typeof a !== 'undefined' ? a: true
	$(make_selector(index)).addClass(color);
}

function reset() {
	$('#election li').removeClass('blue red yellow');
}

function color_all(index) {
	for(var party in gdata[index].parties) {
		color_states(gdata[index].parties[party], party);
	}
}

function change_year(election) {
	$('#year').text(gdata[election].year);
}

$('#next').on('click', function(){
	reset();
	election++;
	color_all(election);
	change_year(election);
});

$('#prev').on('click', function(){
	reset();
	election--;
	color_all(election);
	change_year(election);
});