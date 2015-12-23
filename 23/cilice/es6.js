import { readFileSync } from 'fs'

let i = 0

const reg = {
  a: 1,
  b: 0
}

const input = readFileSync('./input')
                .toString('utf8')
                .trim()
                .split('\n')
                .map(s => s.match(/([^, ]+)/g))

const ops = {
  hlf: x => reg[x] = reg[x] >> 1,
  tpl: x => reg[x] = reg[x] * 3,
  inc: x => reg[x] = reg[x] + 1,
  jmp: x => i = i + Number(x) - 1,
  jie: (x, y) => i = (reg[x] % 2 === 0) ? i + Number(y) - 1: i,
  jio: (x, y) => i = (reg[x] === 1) ? i + Number(y) - 1: i,
}

while (i < input.length) {
  let [op, x, y] = input[i]
  ops[op](x, y)
  i = i + 1
}

console.log(reg)
