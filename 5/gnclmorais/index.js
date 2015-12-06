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

function part1() {
  return str.split('\n').filter(isNiceString).length
}

function main() {
  console.log('Part 1:', part1())
}

main()
