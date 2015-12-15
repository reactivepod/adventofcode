'use strict'

const fs = require('fs')
const input = fs.readFileSync('./input')
                .toString('utf8')
                .trim()
                .split('\n')
                .map(line => line.match(/-?\d+/g).map(Number))

function maxScore(input, n, calValue) {
  let max = 0;
  for (let spoons of splitN(n, input.length)) {
    const cookie = input.map((values, i) => values.map(prop => prop * spoons[i]))
    const calories = cookie.map(values => values.pop());

    if (calValue && calValue !== calories.reduce((a, b) => a + b)) {
      continue;
    }

    const sum = cookie.reduce((a, b) => a.map((prop, i) => prop + b[i]))
    const score = sum.reduce((acc, prop) => acc * Math.max(prop, 0), 1);

    if (score > max) {
      max = score
    }
  }

  return max
}

function* splitN(n, parts, res) {
  if (typeof res === 'undefined') res = []
  let partialSum = res.reduce((a, b) => a + b, 0)
  for (let i = 1; i < n - partialSum - parts; i++) {
    let resNew = [].concat(res).concat(i)
    if (parts > 2) {
      yield* splitN(n, parts - 1, resNew)
    } else {
      resNew.push(n - resNew.reduce((a, b) => a + b, 0))
      yield resNew
    }
  }
}

console.log(maxScore(input, 100), maxScore(input, 100, 500))
