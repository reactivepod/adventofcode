'use strict'

const fs = require('fs')
const input = fs.readFileSync('./input').toString('utf8')

let sum = 0
let index = 0
let firstMinusIndex = 0

for (let char of input) {
  index = index + 1

  if (char === '(') {
    sum = sum + 1
  } else if (char === ')') {
    sum = sum - 1
  }
  if (sum < 0 && firstMinusIndex === 0) {
    firstMinusIndex = index
  }
}

console.log(sum)
console.log(firstMinusIndex)
