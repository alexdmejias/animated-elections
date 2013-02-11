gdata ='';
election = 0;
$.get('assets/data.json', function(data) {
	gdata = data;
	console.log('the data was retrieved');
	color_all(0);
});

function make_selector(arr) {
	return  "." + arr.join(", .");
}

function color_states(index, color, is_class) {
	is_class = typeof a !== 'undefined' ? a: true
	$(make_selector(index)).addClass(color);
}

function reset() {
	$('#election li').removeClass('blue red');
}

function color_all(index) {
	console.log('the election before is ' + election);
	for(var party in gdata[index].parties) {
		color_states(gdata[index].parties[party], party);
	}
	console.log('election is now ' + election);
}

$('#next').on('click', function(){
	reset();
	election++;
	color_all(election);
});

$('#prev').on('click', function(){
	reset();
	election--;
	color_all(election);
});