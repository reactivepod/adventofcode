'use strict'

const md5 = require('md5')
const input = 'bgvyzdsv'
let rest = 0
let test1 = /^0{5}/
let test2 = /^0{6}/
let hash

while (!test1.test(hash)) {
  rest = rest + 1
  hash = md5(`${input}${rest}`)
}

console.log(hash)
console.log(rest)

while (!test2.test(hash)) {
  rest = rest + 1
  hash = md5(`${input}${rest}`)
}

console.log(hash)
console.log(rest)
