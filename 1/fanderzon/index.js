'use strict';

const fetch = require('node-fetch');

function instructionsReducer(prev, next) {
  return prev + (next === '(' ? 1 : -1);
}

function floorMapper(state, instruction) {
  state.floor += instruction === '(' ? 1 : -1;
  return Number(state.floor);
}

// This might not work, but whatever input file you use goes here
fetch('http://adventofcode.com/day/1/input')
  .then(function(response) {
    return response.text();
  })
  .then(function(instructions) {
    let state = {
      floor: 0
    };

    // These are made in two separate steps because I solved them independently of each other
    // If I solved them both at the same time I would use the last index of the mapped array for answer 1
    // and answer 2 the way I already do it based on the index of the first -1
    console.log( 'floor', instructions.split('').reduce(instructionsReducer, 0) );
    console.log( 'basementInstruction', instructions.split('').map(floorMapper.bind(null, state)).indexOf(-1) + 1); // +1 because they want position and not index
  })
  .catch(function(err) {
    console.log(err);
  });
