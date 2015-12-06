/** Disclaimer: this is not exactly good code, just fun code. */

const fs = require('fs')
const str = fs.readFileSync('./input.txt').toString('utf8').trim()
const md5 = require('md5')

function startsWithFiveZeros(string) {
  return string.substr(0, 5) === '00000'
}

function startsWithSixZeros(string) {
  return string.substr(0, 6) === '000000'
}

function mineUntilFound(stopFn, start) {
  var adventCoin, secretKey = (start || 1) - 1

  do {
    secretKey += 1
    adventCoin = md5(str + secretKey)
  } while (!stopFn(adventCoin))

  return secretKey
}

function part1() {
  return mineUntilFound(startsWithFiveZeros)
}

/** Accepts an option start, to bypass starting form the beginning */
function part2(start) {
  return mineUntilFound(startsWithSixZeros, start)
}

function main() {
  var part1Result = part1()

  console.log('Part 1:', part1Result)
  console.log('Part 2:', part2(part1Result))
}

main()
