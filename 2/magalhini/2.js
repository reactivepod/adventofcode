const fs = require('fs');
const file = fs.readFileSync('./2.txt').toString('utf8');
const boxes = file.split('\n');

/* Part 1 */
const getSurface = (l, w, h) => {
	const formula = [
		2 * l * w,
		2 * w * h,
		2 * h * l];

	let [a, b, c] = formula;

	return a + b + c + Math.min(a, b, c) / 2;
};

/* Part 2 */
const getVolume = (l, w, h) => {
	l = parseInt(l, 10);
	w = parseInt(w, 10);
	h = parseInt(h, 10);

	return (l * w * h) + (l + w + h) * 2 - Math.max(l, w, h) * 2;
};

let totalFeetOfRibbon = boxes.reduce((prev, curr) => {
	return prev + getVolume(...curr.split('x'));
}, 0);

let totalFeetOfPaper = boxes.reduce((prev, curr) => {
	return prev + getSurface(...curr.split('x'));
}, 0);

console.log(new Date().getMonth() === 11 ? '~~ MERRY XMAS! 🎅  ~~' : '');
console.log('Total feet of paper:', totalFeetOfPaper);
console.log('Total feet of ribbon:', totalFeetOfRibbon);