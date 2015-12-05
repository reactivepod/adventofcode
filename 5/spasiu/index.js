var _ = require('highland');
var fs = require('fs');
var filepath = process.argv[2];
var source = _(fs.createReadStream(filepath));

source
	.split()
	.filter(checkString)
	.reduce(0, count)
	.invoke('toString')
	.pipe(process.stdout);

function checkString(string) {
	return /(\w{2}).*\1/.test(string) && /(\w)\w\1/.test(string);
}

function count(sum) {
	return sum + 1;
}

