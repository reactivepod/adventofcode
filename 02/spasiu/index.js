var fs = require('fs');
var _ = require('highland');
var filepath = process.argv[2];
var source = _(fs.createReadStream(filepath)).split();

source.fork()
	.map(getPaper)
	.reduce1(sum)
	.pipe(process.stdout);

source.fork()
	.map(getRibbon)
	.reduce1(sum)
	.pipe(process.stdout);

function getRibbon(parcel) {
	if (parcel === '') return 'Ribbon: ';

	var dim = sort(parcel.split('x').map(Number));

	var ribbon = dim[0]*2 + dim[1]*2;

	var bow = dim.reduce(function(sum, side) {
		return sum * side;
	});

	return bow + ribbon;
}

function getPaper(parcel) {
	if (parcel === '') return 'Paper: ';

	var dim = sort(parcel.split('x').map(Number)),

		n1 = dim[0],
		n2 = dim[1],
		n3 = dim[2];

	return 2*n1*n2 + 2*n2*n3 + 2*n3*n1 + n1*n2;
}

function sum(sum, material) {
	if (typeof material == 'string') return material + sum + ' ft\n';
	return sum + material;
}

function sort(arr) {
	return arr.sort(function(a, b) {
		return	a < b ? -1 : a > b ? 1 : 0;
	});
}
