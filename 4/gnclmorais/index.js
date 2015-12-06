/** Disclaimer: this is not exactly good code, just fun code. */

const fs = require('fs')
const str = fs.readFileSync('./input.txt').toString('utf8').trim()
const md5 = require('md5')

function startsWithFiveZeros(string) {
  return string.substr(0, 5) === '00000'
}

function part1() {
  var adventCoin, secretKey = 1

  do {
    adventCoin = md5(str + secretKey++)
  } while (!startsWithFiveZeros(adventCoin))

  return secretKey
}

function main() {
  console.log('Part 1:', part1())
}

main()
