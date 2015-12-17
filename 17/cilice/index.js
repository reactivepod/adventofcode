'use strict'

const fs = require('fs')
const data = fs.readFileSync('./input')
                .toString('utf8')
                .trim()
                .split('\n')
                .map(Number)

function powerSet( list ){
    var set = [],
        listSize = list.length,
        combinationsCount = (1 << listSize);

    for (var i = 1; i < combinationsCount ; i++ , set.push(combination) ) {
      for (var j=0, combination = [];j<listSize;j++) {
        if ((i & (1 << j))) {
          combination.push(list[j])
        }
      }
    }
    return set;
}

const combinations = powerSet(data)
const partOne = combinations.filter(set => set.reduce((a, b) => a + b, 0) === 150)
const min = Math.min.apply(null, partOne.map(a => a.length))
const partTwo = partOne.filter(set => set.length == min)

console.log(partOne.length)
console.log(partTwo.length)
