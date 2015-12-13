/** Disclaimer: this is not exactly good code, just fun code. */

const fs = require('fs')
const str = fs.readFileSync('./input.txt').toString('utf8').trim()

function hasThreeVowels(str) {
  return (str.match(/[aeiou]/gi) || []).length > 2
}

function hasOneLetterTwice(str) {
  for (var i = 0, s = str.length - 1; i < s; i += 1) {
    if (str[i] === str[i + 1]) return true
  }
  return false
}

function noSpecialStrings(str) {
  return [ 'ab', 'cd', 'pq', 'xy' ].every(function (no) {
    return !new RegExp(no, 'i').test(str)
  })
}

function isNiceString(str) {
  return hasThreeVowels(str) && hasOneLetterTwice(str) && noSpecialStrings(str)
}

function hasPairNotOverlapping(str) {
  for (var i = 0, s = str.length - 1; i < s; i += 1) {
    var pair = str.substr(i, 2)
    if (str.indexOf(pair) + 1 < str.lastIndexOf(pair)) return true
  }
  return false
}

function hasOneRepeatWithOneBetween(str) {
  for (var i = 0, s = str.length - 2; i < s; i += 1) {
    if (str[i] === str[i + 2]) return true
  }
  return false
}

function isNiceStringForPart2(str) {
  return hasPairNotOverlapping(str) && hasOneRepeatWithOneBetween(str)
}

function part1() {
  return str.split('\n').filter(isNiceString).length
}

function part2() {
  return str.split('\n').filter(isNiceStringForPart2).length
}

function main() {
  console.log('Part 1:', part1())
  console.log('Part 2:', part2())
}

main()
