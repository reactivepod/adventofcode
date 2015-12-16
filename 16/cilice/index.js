'use strict'

const fs = require('fs')

const input = fs.readFileSync('./input2')
                .toString('utf8')
                .trim()
                .split('\n')
                .reduce((data, line) => {
                  const parts = line.split(':')
                  data[parts[0]] = Number(parts[1])
                  return data
                }, {})

const data = fs.readFileSync('./input')
                .toString('utf8')
                .trim()
                .split('\n')
                .map((line) => {
                  const parts = line.split(',').map(part => part.trim().split(': '))
                  const number = parts[0].shift().split(' ')

                  return {
                    number: Number(number[1]),
                    [parts[0][0]]: Number(parts[0][1]),
                    [parts[1][0]]: Number(parts[1][1]),
                    [parts[2][0]]: Number(parts[2][1]),
                  }
                })

const partOne = data.filter(sue => {
  return Object.keys(sue)
               .filter(name => name !== 'number')
               .every(prop => {
                  return sue[prop] === input[prop]
                })
})

const partTwo = data.filter(sue => {
  return Object.keys(sue)
               .filter(name => name !== 'number')
               .every(prop => {
                 switch (prop) {
                   case 'cats':
                   case 'trees':
                     return sue[prop] >= input[prop]
                   case 'pomeranians':
                   case 'goldfish':
                     return  sue[prop] <= input[prop]
                   default:
                     return  sue[prop] === input[prop]
                 }
                })
})

console.log(partOne)
console.log(partTwo)
