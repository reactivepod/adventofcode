import { readFileSync } from 'fs'
import splice from 'string-splice'

const input = readFileSync('./input').toString('utf8')
  .trim()
  .split('\n')
  .reduce((formula, line) => {
    const [element, replacement] = line.split(' => ')

    if (!formula[element]) formula[element] = []
    formula[element].push(replacement)

    return formula
  }, {})

const formula = 'CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF'

// console.log(input)
const rx = /([a-zA-Z][a-z]*)/g
let match;
let matches = []

while ((match = rx.exec(formula)) !== null) {
  matches = [...matches, match]
}

const partOne = matches.reduce((data, entry) => {
  const index = entry.index
  const element = entry[0]

  if (input[element]) {
    input[element].forEach(replacement => {
      data.push(splice(`${formula}`, index, element.length, replacement))
    })
  }

  return data
}, []).filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
})

console.log(partOne.length)

const reverse = Object.keys(input).reduce((table, replacement) => {
  input[replacement].forEach(element => {
    table.set(element, replacement)
  })

  return table
}, new Map())

let target = formula
let partTwo = 0

while (target !== 'e') {
  for (const [element, replacement] of reverse.entries()) {
    if (target.includes(element)) {
      target = target.replace(element, replacement)
      partTwo = partTwo + 1
    }
  }
}

console.log(partTwo)
