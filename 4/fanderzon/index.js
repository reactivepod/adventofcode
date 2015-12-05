const md5 = require('md5');
const input = 'yzbqklnj',
      pattern5 = /^00000/,
      pattern6 = /^000000/;

let counter = 1,
    hash = '';


while (!pattern5.test(hash)) {
  hash = md5(input + counter);
  counter++;
}

console.log('five zeroes', counter - 1);

while (!pattern6.test(hash)) {
  hash = md5(input + counter);
  counter++;
}
console.log('six zeroes', counter - 1);
