var fs = require('fs');
var hi = require('highland');
var lo = require('lodash');
var filepath = process.argv[2];
var source = hi(fs.createReadStream(filepath));
var initialCoords = [{x: 0, y:0}, {x: 0, y:0}];

source
	.splitBy('')
	.batch(2)
	.reduce([initialCoords], recordMove)
	.map(unique)
	.map(count)
	.pipe(process.stdout);

function recordMove(coordinates, instructions) {
	var last = lo.last(coordinates);
	var zipped = lo.zip(instructions, last);
	var newCoords = zipped.map(function(set) {
		var instruction = set[0], last = set[1];
		if (instruction == '<') return {x: last.x - 1, y: last.y};
		if (instruction == '>') return {x: last.x + 1, y: last.y};
		if (instruction == '^') return {x: last.x, y: last.y + 1};
		if (instruction == 'v') return {x: last.x, y: last.y - 1};
	});
	return coordinates.concat([newCoords]);
}

function unique(arr) {
	return lo(arr).flatten().map(JSON.stringify).uniq();

}

function count(arr) {
	return arr.reduce(sum => sum + 1, 0).toString();
}
