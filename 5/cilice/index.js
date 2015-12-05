'use strict'

const fs = require('fs')
const input = fs.readFileSync('./input').toString('utf8').trim().split('\n')

const exclude = str => !/ab|cd|pq|xy/.test(str)
const vowels = str => (str.match(/a|e|i|o|u/g) || []).length > 2
const twice = str => /([a-z])\1{1}/.test(str)

const partOne = input.filter(exclude)
                     .filter(vowels)
                     .filter(twice)

console.log(partOne.length)

const pairLetters = str => /([a-z]{2})[a-z]*\1/.test(str)
const betweenLetters = str => /([a-z]{1})[a-z]{1}\1/.test(str)

const partTwo = input.filter(pairLetters)
                     .filter(betweenLetters)

console.log(partTwo.length)
