/** Disclaimer: this is not exactly good code, just fun code. */

const fs = require('fs')
const fl = fs.readFileSync('./input.txt').toString('utf8')

function position2label(position) {
  return position.join('~')
}

function getMove(char) {
  return {
    '^': [ 0,  1],
    '>': [ 1,  0],
    'v': [ 0, -1],
    '<': [-1,  0],
  }[char]
}

function directions2moves(str) {
  return str.trim().split('').map(getMove)
}

function makeMove(position, move) {
  return [
    position[0] + move[0],
    position[1] + move[1],
  ]
}

function dropPresent(position, path) {
  var label = position2label(position)
  path[label] = (path[label] || 0) + 1

  return path
}

function traceSantaPath(moves) {
  var position = [0, 0], path = {}
  path[position2label(position)] = 1

  moves.forEach(function (move) {
    position = makeMove(position, move)
    path = dropPresent(position, path)
  })

  return path
}

function traceSantaAndRobotPath(moves) {
  var path = {}, positions = [
    [0, 0], // Santa
    [0, 0], // Robot
  ]
  path[position2label(positions[0])] = 2

  moves.forEach(function (move, index) {
    positions[index % 2] = makeMove(positions[index % 2], move)
    path = dropPresent(positions[index % 2], path)
  })

  return path
}

function countKeys(obj) {
  return Object.keys(obj).length
}

function part1() {
  return countKeys(traceSantaPath(directions2moves(fl)))
}

function part2() {
  return countKeys(traceSantaAndRobotPath(directions2moves(fl)))
}

function main() {
  console.log('Part 1:', part1())
  console.log('Part 2:', part2())
}

main()
