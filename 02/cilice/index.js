'use strict'

const fs = require('fs')

const numberSort = (a, b) => a < b ? -1 : a > b ? 1 : 0
const reduceAdd = (pre, curr) => pre + curr

// node v4 doesn't support destructing :(
const objectify = a => {
  return {
    l: a[0],
    w: a[1],
    h: a[2],
  }
}

const inputMap = line => line.split('x')
                             .map(Number)
                             .sort(numberSort)

const input = fs.readFileSync('./input')
                .toString('utf8')
                .trim()
                .split('\n')
                .map(inputMap)
                .map(objectify)

const getResult = mapFunc => input.map(mapFunc).reduce(reduceAdd, 0)

const paperFunc = o => {
                    const extra = o.l * o.w
                    const sum = 2* o.l * o.w + 2 * o.w * o.h + 2 * o.h * o.l

                    return sum + extra
                  }


const ribbonFunc = o => {
                      const extra = 2 * o.l + 2 * o.w
                      const sum = o.l * o.w * o.h

                      return sum + extra
                    }


console.log(getResult(paperFunc))
console.log(getResult(ribbonFunc))
