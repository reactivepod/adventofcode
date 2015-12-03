'use strict';

const fetch = require('node-fetch');

function santaMapper(state, instruction) {
  state.santaCoord = move(state.santaCoord, instruction);
  return state.santaCoord.join('x');
}

function duoMapper(state, instruction, index) {
  const worker = index % 2 === 0 ? 'santa' : 'robo';
  state.duoCoords[worker] = move(state.duoCoords[worker], instruction);
  return state.duoCoords[worker].join('x');
}

function move(coord, instruction) {
  return [
    coord[0] + (instruction === '^' ? 1 : 0) + (instruction === 'v' ? -1 : 0),
    coord[1] + (instruction === '>' ? 1 : 0) + (instruction === '<' ? -1 : 0)
  ];
}

function uniqueFilter(element, index, arr) {
  return index === arr.lastIndexOf(element);
}

// This might not work, but whatever input file you use goes here
fetch('http://adventofcode.com/day/3/input')
  .then(function(response) {
    return response.text();
  })
  .then(function(data) {
    console.log(data);
    let state = {
      santaCoord: [0, 0],
      duoCoords: {
        santa: [0, 0],
        robo: [0, 0]
      }
    };

    console.info( 'visited by santa', data.trim().split('')
      .map(santaMapper.bind(null, state))
      .concat('0x0')
      .filter(uniqueFilter).length );

    console.info( 'visited by duo', data.trim().split('')
      .map(duoMapper.bind(null, state))
      .concat('0x0')
      .filter(uniqueFilter).length );
  })
  .catch(function(err) {
    console.log(err);
  });
