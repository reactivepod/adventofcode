var fs = require('fs');
var _ = require('highland');
var filepath = process.argv[2];
var state = {floor: 0, count: 0};

_(fs.createReadStream(filepath))
	.splitBy('')
	.reduce(state, directions)
	.pluck('floor')
	.invoke('toString')
	.pipe(process.stdout);

function directions(state, data) {
	if (state.floor == -1 && !state.flag) {
		console.log('Basement: ', state.count);
		state.flag = true;
	}

	state.floor += data === '(' ? 1 : -1;
	state.count += 1;
	return state;
}