'use strict'

const regex = /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)/
const fs = require('fs')
const input = fs.readFileSync('./input')
                .toString('utf8')
                .trim()
                .split('\n')
                .reduce((data, line) => {
                  const matches = line.match(regex)
                  const from = matches[1]
                  const to = matches[4]
                  const sign = matches[2] === 'gain' ? +1 : -1

                  data[from] = data[from] || {}
                  data[to] = data[to] || {}

                  data[from][to] = sign * Number(matches[3])

                  return data
                }, {})

const data = {
  input
}



const partOne = permute(Object.keys(data.input)).reduce((total, table, index) => {
  const happiness = table.reduce(getHappiness.bind(data), 0)
  if (happiness > total) {
    return total = happiness
  } else {
    return total
  }
}, 0);

console.log(partOne)

const addMe = data => {
  const people = Object.keys(data)
  data['Cilice'] = data['Cilice'] || {}
  people.forEach(person => {
    data['Cilice'][person] = 0
    data[person]['Cilice'] = 0
  })

  return data
}

const data2 = Object.assign({}, data, {
  input: addMe(data.input)
})

const partTwo = permute(Object.keys(data2.input)).reduce((total, table, index) => {
  const happiness = table.reduce(getHappiness.bind(data2), 0)
  if (happiness > total) {
    return total = happiness
  } else {
    return total
  }
}, 0);

console.log(partTwo)

function getHappiness(total, from, index, path) {
  const to = path[index + 1] || path[0]
  return total + this.input[from][to] + this.input[to][from]
}

function permute(inputArr) {
    var results = [];

    function permute_rec(arr, memo) {
        var cur, memo = memo || [];

        for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute_rec(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    return permute_rec(inputArr);
}
