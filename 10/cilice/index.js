'use strict'

const input = '1113222113'
const lookAndSay = input => input.match(/(.)\1*/g)
                                 .map(el => `${el.length}${el[0]}`)
                                 .join``

const iterate = (times, input) => new Array(times).fill()
                                                  .reduce(lookAndSay, input)

console.log(iterate(40, input).length)
console.log(iterate(50, input).length)
