/** Disclaimer: this is not exactly good code, just fun code. */

const fs = require('fs')
const fl = fs.readFileSync('./input.txt').toString('utf8')

function paperForBox(l, w, h) {
  var faces = [
    l * w,
    w * h,
    h * l,
  ]

  return faces.reduce(function (acc, face) {
    return acc + face * 2
  }, 0) + Math.min.apply(null, faces)
}

function ribbonForBox(l, w, h) {
  return [l, w, h].reduce(function (acc, side) {
    return acc + side * 2
  }, 0) + (l * w * h) - Math.max(l, w, h) * 2
}

function splitAndReduce(str, fn) {
  return str.split('\n').reduce(function (acc, lxwxh) {
    return acc + (lxwxh ? fn.apply(null, lxwxh.split('x')) : 0)
  }, 0)
}

function part1() {
  return splitAndReduce(fl, paperForBox)
}

function part2() {
  return splitAndReduce(fl, ribbonForBox)
}

function main() {
  console.log('Part 1:', part1())
  console.log('Part 2:', part2())
}

main()
