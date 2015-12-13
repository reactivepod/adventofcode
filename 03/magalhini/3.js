const fs = require('fs');
const instructions = fs.readFileSync('./3.txt').toString('utf8').split('');

const checkHouseAt = ((house, year) => {
	if (year.indexOf(house) === -1) year.push(house);
});

const onlyUnique = ((value, idx, self) => self.indexOf(value) === idx);

const move = ((val, grid) => {
	if (val === '^') grid[1]++;
	if (val === '>') grid[0]++;
	if (val === '<') grid[0]--;
	if (val === 'v') grid[1]--;
});

const findUniqueHouses2015 = () => {
	let houses = [] ;
	let santaPos = [0,0];

	instructions.forEach((n) => {
		move(n, santaPos);
		checkHouseAt(santaPos.join('_'), houses);
	});

	console.log('Houses for 2015:', houses.length);
};

const findUniqueHouses2016 = () => {
	let houses = [];
	let santaPos = [0,0];
	let robotSantaPos = [0,0];

	instructions.forEach((n, idx) => {
		let santa = idx % 2 === 0 ? santaPos : robotSantaPos;
		move(n, santa);
		checkHouseAt(santa.join('_'), houses);
	});

	console.log('Houses for 2016:', houses.filter(onlyUnique).length);
}

findUniqueHouses2015();
findUniqueHouses2016();
