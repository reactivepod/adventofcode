import { readFileSync } from 'fs'
import shuffle from 'array-shuffle'

const data = readFileSync('./input')
  .toString('utf8')
  .trim()
  .split('\n')
  .reduce((matrix, line) => {
    const [path, distance] = line.split(' = ')
    const [from, to] = path.split(' to ')

    matrix[from] = matrix[from] || {}
    matrix[to] = matrix[to] || {}

    matrix[from][to] = Number(distance)
    matrix[to][from] = Number(distance)

    return matrix
  }, {})

const getDistance = (total, from, index, path) => {
  const to = path[index + 1]
  return total + (data[from][to] || 0)
}

const compute = what => {
  let result = false
  const path = Object.keys(data)

  for (let i = 0; i < 1000000; i++) {
    const len = shuffle(path).reduce(getDistance, 0)
    result = Math[what](result, len) || len
  }

  return result
}


console.log(['min', 'max'].map(compute))
