var md5 = require('md5');
var _ = require('highland');
var input = process.argv[2];

_(genNum)
	.find(checkNum)
	.invoke('toString')
	.pipe(process.stdout);

function genNum(push) {
	var n = 1;
	while (true) {
		push(null, n++);
	}
}

function checkNum(n) {
	return md5(input + n).slice(0, 6) == '000000';
}