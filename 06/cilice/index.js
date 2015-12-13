'use strict'

const fs = require('fs')
const _ = require('lodash')

const size = 1000

const parseCommand = arr => {
  return {
    command: arr[0],
    from: _.zipObject(['x', 'y'], arr[1].split(',').map(Number)),
    to: _.zipObject(['x', 'y'], arr[3].split(',').map(Number)),
  }
};

const splitCommand = line => parseCommand(_.takeRight(line.split(' '), 4))

const indeces = (command) => {
  const xValues = _.range(command.from.x, command.to.x + 1)
  const yValues = _.range(command.from.y, command.to.y + 1)

  return _.flatten(yValues.map(y => xValues.map(x => x + (y * size))));
}

const firstPart = (state, command) => {
  const iValues = indeces(command);

  const on = (i, state) => state.grid[i] = true
  const off = (i, state) => state.grid[i] = false
  const toggle = (i, state) => (!state.grid[i]) ? state.grid[i] = true : state.grid[i] = false

  if (command.command === 'toggle') {
    iValues.forEach(i => toggle(i, state))
  } else if (command.command === 'on') {
    iValues.forEach(i => on(i, state))
  } else if (command.command === 'off') {
    iValues.forEach(i => off(i, state))
  }

  return state
}


const secondPart = (state, command) => {
  const iValues = indeces(command);

  const on = (i, state) => state.grid[i] = state.grid[i] + 1
  const off = (i, state) => {
    if (state.grid[i] > 0) {
      state.grid[i] = state.grid[i] - 1
    }
    return state.grid[i]
  }
  const toggle = (i, state) => state.grid[i] = state.grid[i] + 2

  if (command.command === 'toggle') {
    iValues.forEach(i => toggle(i, state))
  } else if (command.command === 'on') {
    iValues.forEach(i => on(i, state))
  } else if (command.command === 'off') {
    iValues.forEach(i => off(i, state))
  }

  return state
}

const input = fs.readFileSync('./input')
                .toString('utf8')
                .trim()
                .split('\n')
                .map(splitCommand)

const partOne = input.reduce(firstPart, { grid: new Array(size * size) })
const partTwo = input.reduce(secondPart, { grid: _.range(0, size * size, 0) })

console.log(_.compact(partOne.grid).length)

console.log(partTwo.grid.reduce((prev, curr) => prev + curr, 0));
