import { readFileSync } from 'fs'

const input = readFileSync('input').toString('utf8').trim()

const parse = input => {
  let grid = input.split('\n').map(s => ['.', ...s, '.'].map(ch => ch === '#'))
  let row = () => [...new Array(grid.length + 2)].fill(false)
  return [row(), ...grid, row()]
}

const count = arr => arr.filter(x => x).length
const countTotal = arr => arr.reduce((sum, row) => sum + count(row), 0)

const neighbours = (x, y) => [
  [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
  [x,     y - 1],             [x,     y + 1],
  [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]
];

const iterate = (n, fn, arg, grid) => [...new Array(n)].reduce(x => fn(x, arg), grid)

const update = (grid, corners = false) => {
  const result = grid.map(row => [...row])
  const max = grid.length - 2

  const isCorner = (x, y) => corners && (x === 1 || x === max) && (y === 1 || y === max)
  const isOn = ([x, y]) => isCorner(x, y) || grid[x][y]

  for (let i = 1; i <= max; i++) {
  for (let j = 1; j <= max; j++) {
    const on = count(neighbours(i, j).map(isOn));
    result[i][j] = isCorner(i, j) || (grid[i][j] ? on === 2 || on === 3 : on === 3)
  }
  }

  return result
}

let grid = parse(input)

// console.log( neighbours(2, 2) )
console.log( countTotal(iterate(100, update, false, grid)) )
console.log( countTotal(iterate(100, update, true, grid)) )
