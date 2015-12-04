const fs = require('fs')
const fl = fs.readFileSync('./input.txt').toString('utf8')

function upOrDown(prev, char) {
  return prev + (char === '(') * 2 - 1
}

function basementChar(prev, char, index) {
  if (typeof prev === 'string') return prev

  var floor = upOrDown(prev, char)
  return floor === -1 ? (index + 1).toString() : floor
}

function main() {
  console.log('Part 1:', fl.split('').reduce(upOrDown, 0))
  console.log('Part 2:', fl.split('').reduce(basementChar, 0))
}

main()
