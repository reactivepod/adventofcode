'use strict'

const fs = require('fs')

const getInstruction = char => {
  if (char === 'v') {
    return { key: 'x', value: -1 }
  } else if (char === '>') {
    return { key: 'y', value:  1 }
  } else if (char === '<') {
    return { key: 'y', value: -1 }
  } else if (char === '^') {
    return { key: 'x', value:  1 }
  }
}

const input = fs.readFileSync('./input').toString('utf8').trim().split('').map(getInstruction)

const fillHouses = (state, coords) => {
  if (!state.houses[coords]) {
    state.houses[coords] = 1
  } else {
    state.houses[coords] = state.houses[coords] + 1
  }

  return state
}

const partOne = (state, current, index) => {
  state.pos[current.key] = state.pos[current.key] + current.value
  const coords = `${state.pos.x}x${state.pos.y}`

  return fillHouses(state, coords)
}

const partTwo = (state, current, index) => {
  let who = index % 2 == 0 ? 'santa' : 'robot'
  state.pos[who][current.key] = state.pos[who][current.key] + current.value
  const coords = `${state.pos[who].x}x${state.pos[who].y}`

  return fillHouses(state, coords)
}

const getHouses = o => Object.keys(o.houses).length

console.log(getHouses(input.reduce(partOne, {
  houses: { '0x0': 1 },
  pos: {
    x: 0,
    y: 0
  }
})))

console.log(getHouses(input.reduce(partTwo, {
  houses: { '0x0': 1 },
  pos: {
    santa: {
      x: 0,
      y: 0
    },
    robot: {
      x: 0,
      y: 0
    }
  }
})))
