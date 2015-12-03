'use strict'

const fs = require('fs')
const input = fs.readFileSync('./input')
                .toString('utf8')
                .trim()
                .split('\n')
                .map(line => line.split('x').map(Number))
                .map(arr => {
                  const l = arr[0]
                  const w = arr[1]
                  const h = arr[2]

                  const maxIndex = arr.indexOf(Math.max.apply(null, arr))
                  arr.splice(maxIndex, 1)
                  const extra = arr.reduce((pre, curr) => pre + 2 * curr, 0)

                  const sum = l*w*h

                  return sum + extra
                })
                .reduce((pre, curr) => pre + curr, 0)


console.log(input)
