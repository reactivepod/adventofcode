'use strict'

const fs = require('fs')

const splitCommand = line => line.split(' -> ')

const checkNan = arg => {
  const n = Number(arg)
  return Number.isNaN(n) ? arg : n
}

const cpu = {}
cpu.rshift = (a, b) => ((a >> b % 65536) + 65536) % 65536
cpu.lshift = (a, b) => ((a << b % 65536) + 65536) % 65536
cpu.and = (a, b) => ((a & b % 65536) + 65536) % 65536
cpu.or = (a, b) => ((a | b % 65536) + 65536) % 65536
cpu.not = value => ((~value % 65536) + 65536) % 65536
cpu.equal = value => value


const parse = command => {
  const output = {}
  const parts = command.split(' ')

  if (parts.length === 1) {
    output.args = [ checkNan(parts[0]) ]
    output.cmd = 'equal'
  }

  if (parts.length === 2) {
    output.args = [ checkNan(parts[1]) ]
    output.cmd = 'not'
  }

  if (parts.length === 3) {
    output.args = [parts[0], parts[2]].map(checkNan)
    output.cmd = parts[1].toLowerCase().trim()
  }

  return output
}

const data = fs.readFileSync('./input')
                .toString('utf8')
                .trim()
                .split('\n')
                .map(splitCommand)
                .reduce((state, command) => {
                  state[command[1]] = parse(command[0])
                  return state;
                }, {});

function compute(letter, cache) {
  const cmd = data[letter];
  const result = cpu[cmd.cmd].apply(null, cmd.args.map(arg => (typeof arg === 'number') ? arg : (cache[arg]) ? cache[arg] : compute(arg, cache) ))
  cache[letter] = result;
  return result;
}

console.log(compute('a', { }))
console.log(compute('a', { b: 46065 }))
