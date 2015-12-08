'use strict'

const fs = require('fs')
const data = fs.readFileSync('./input')
                .toString('utf8')
                .trim()
                .split('\n')


const esc = /\\(?:"|\\)/g
const utf8 = /\\x[0-9a-f]{2}/g

const match = (str, regex) => (str.match(regex) || []).length

const partOne = str => (2 + match(str, esc)) + (match(str, utf8) * 3)
const partTwo = str => (4 + match(str, esc) * 2) + (match(str, utf8))

console.log(data.reduce((total, curr) => total + partOne(curr), 0))
console.log(data.reduce((total, curr) => total + partTwo(curr), 0))
