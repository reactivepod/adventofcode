'use strict'

const input = require('./input')
const _ = require('lodash')
const values = o => Object.keys(o).map(k => o[k])

function sumNumbers(obj, part2) {
    if (obj instanceof Object) {
        let rec = !part2 || obj instanceof Array || values(obj).indexOf('red') === -1;
        return rec ? values(obj).reduce((sum, v) => sum + sumNumbers(v, part2), 0) : 0;
    } else {
        return Number.isInteger(obj) ? obj : 0;
    }
}


console.log(sumNumbers(input, true))
