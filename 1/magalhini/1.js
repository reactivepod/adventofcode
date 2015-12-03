const fs = require('fs');
const file = fs.readFileSync('./1.txt').toString('utf8');

let level = 0;

let findWay = (char) => {
	if (char === '(') return 1;
	else if (char === ')') return -1;
}

for (let char of file) {
	level += findWay(char);
}

console.log('Final level is:', level);