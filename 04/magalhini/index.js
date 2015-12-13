'use strict';
// Make sure to do a 'npm i md5' first!
import md5 from 'md5';

const key = 'bgvyzdsv';

const beginsWithZeros = ((string, amount) => {
	return string.slice(0, amount)
		.split('')
		.filter((x) => x === '0')
		.length >= amount;
});

const increaseHash = ((key, zeros = 5) => {
	let idx = 1;

	while (!beginsWithZeros(md5(key + idx), zeros)) idx += 1;
	return idx;
});

let first = increaseHash(key);
let second = increaseHash(key, 6);

console.log(first, second);



