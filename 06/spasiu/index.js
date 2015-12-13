// program
var fs = require('fs');
var hi = require('highland');
var lo = require('lodash');
var filepath = process.argv[2];
var source = hi(fs.createReadStream(filepath));
var gridSize = 1000;
var grid = lo.times(gridSize * gridSize, () => 0);

source
	.split()
	.map(splitCommand)
	.reduce(grid, execute)
	.map(count)
	.invoke('toString')
	.pipe(process.stdout);

function execute(grid, command) {
	if (command[0] == 'toggle') {
		return switchLights(toggle, grid, command[1], command[3]);
	}

	if (command[1] == 'on') {
		return switchLights(on, grid, command[2], command[4]);
	}

	if (command[1] == 'off') {
		return switchLights(off, grid, command[2], command[4]);
	}
}

function switchLights(action, grid, start, end) {
	var r = getRanges(start, end);
	var x0 = r.x.start;
	var x1 = r.x.end + 1;
	return lo(lo.range(gridSize)
		.map(function(y) {
			var row = getRow(grid, y);
			if (y < r.y.start || y > r.y.end) return row;
			return newRow = [
				row.slice(0, x0),
				row.slice(x0, x1).map(action),
				row.slice(x1, gridSize)
			];
		})).flatten(true).value();
}

function getRow(grid, row) {
	return grid.slice(row * gridSize, row * gridSize + gridSize);
}

function getRanges(start, end) {
	var startSplit = start.split(',');
	var endSplit = end.split(',');
	return {
		x:{
			start: Number(startSplit[0]),
			end: Number(endSplit[0])
		},
		y: {
			start: Number(startSplit[1]),
			end: Number(endSplit[1])
		}
	};
}

function off(brightness) {
	return brightness === 0? 0: brightness -1;
}

function on(brightness) {
	return brightness + 1;
}

function toggle(brightness) {
	return brightness + 2;
}

function count(grid) {
	return grid.reduce(function(sum, brightness) {
		return sum + brightness;
	}, 0);
}

function splitCommand(command) {
	return command.split(' ');
}