const fs = require('fs');
const file = fs.readFileSync('./1.txt').toString('utf8');

let level = 0;
let basement = 0;
let iterator = 0;

let findWay = (char) => {
	if (char === '(') return 1;
	else if (char === ')') return -1;
}

for (let char of file) {
	++iterator;
	level += findWay(char);

	if (!basement && level === -1) {
		basement = iterator;
	}
}

console.log('Final level is:', level);
console.log('Basement step is', basement);
