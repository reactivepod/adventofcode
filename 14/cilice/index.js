'use strict'

const regex = /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+)/
const fs = require('fs')
const input = fs.readFileSync('./input')
                .toString('utf8')
                .trim()
                .split('\n')
                .map((line) => {
                  const matches = line.match(regex)

                  const data = {
                    name: matches[1],
                    speed: Number(matches[2]),
                    stamina: Number(matches[3]),
                    sleep: Number(matches[4]),
                    distance: 0,
                    mode: 'f',
                    remaining: Number(matches[3]),
                    points: 0
                  }

                  return data
                })

const total = 2503

for (var t = 0; t < total; t++) {
  input.forEach((r) => {
    if (r.mode !== 'r') {
      r.distance += r.speed
    }

    r.remaining = r.remaining - 1

    if (r.remaining === 0) {
      r.mode = r.mode === 'f' ? 'r' : 'f'
      r.remaining = r.mode === 'f' ? r.stamina : r.sleep
    }
  })

  const max = input.reduce((max, r) => r.distance > max ? r.distance : max, 0)
  input.filter(r => r.distance === max).forEach(r => r.points++)
}
