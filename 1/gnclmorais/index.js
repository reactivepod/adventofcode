const fs = require('fs')
const fl = fs.readFileSync('./input.txt').toString('utf8')

function upOrDown(char) {
  return char === '(' ? 1 : -1
}

function main() {
  console.log(fl.split('').reduce(upOrDown));
}

main();
