/** Disclaimer: this is not exactly good code, just fun code. */

const fs = require('fs')
const str = fs.readFileSync('./input.txt').toString('utf8').trim()

function getLabel(x, y) {
  return x + ',' + y
}

function turnOn(board, x, y) {
  board[getLabel(x, y)] = 1
}

function turnOff(board, x, y) {
  delete board[getLabel(x, y)]
}

function toggle(board, x, y) {
  (board[getLabel(x, y)] ? turnOff : turnOn)(board, x, y)
}

function performInterval(board, fn, x1, y1, x2, y2) {
  x1 = parseInt(x1)
  y1 = parseInt(y1)
  x2 = parseInt(x2)
  y2 = parseInt(y2)
  for (var i = x1; i <= x2; i += 1) {
    for (var j = y1; j <= y2; j += 1) {
      switch (fn) {
        case 'turnOn':  fn = turnOn;  break;
        case 'turnOff': fn = turnOff; break;
        case 'toggle':  fn = toggle;  break;
      }
      fn(board, i, j)
    }
  }
}

function part1() {
  var board = {}
  str.split('\n').forEach(function (instruction, index) {
    performInterval.apply(null, [board].concat(instruction
      .trim() // just in case
      .replace('turn on ', 'turnOn,')
      .replace('turn off ', 'turnOff,')
      .replace('toggle ', 'toggle,')
      .replace(' through ', ',')
      .split(','))
    )
  })

  return Object.keys(board).length
}

function getBrightness(board, x, y) {
  return board[getLabel(x, y)] || 0
}

function turnOnBrightness(board, x, y) {
  board[getLabel(x, y)] = getBrightness(board, x, y) + 1
}

function turnOffBrightness(board, x, y) {
  board[getLabel(x, y)] = Math.max(getBrightness(board, x, y) - 1, 0)
}

function toggleBrightness(board, x, y) {
  board[getLabel(x, y)] = getBrightness(board, x, y) + 2
}

function part2() {
  var board = {}

  turnOn  = turnOnBrightness
  turnOff = turnOffBrightness
  toggle  = toggleBrightness

  str.split('\n').forEach(function (instruction, index) {
    performInterval.apply(null, [board].concat(instruction
      .trim() // just in case
      .replace('turn on ', 'turnOn,')
      .replace('turn off ', 'turnOff,')
      .replace('toggle ', 'toggle,')
      .replace(' through ', ',')
      .split(','))
    )
  })

  var totalBrightness = 0
  for (var light in board)
    totalBrightness += board[light]

  return totalBrightness
}

function main() {
  console.log('Part 1:', part1())
  console.log('Part 2:', part2())
}

main()
