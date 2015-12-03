'use strict';

const fetch = require('node-fetch');

function paperReducer(prev, next) {
  let [l, w, h] = next.split('x');

  return prev +
    (
      ( 2 * l * w ) +
      ( 2 * w * h ) +
      ( 2 * h * l )
    ) + Math.min(l, w, h);
}

function ribbonReducer(prev, next) {
  const arr = next.split('x').map( Number );
  const [l, w, h] = arr;
  const largestSide = arr.indexOf( Math.max.apply(Math, arr) );
  // yes, yes, I know, a lot of work instead of just using splice just to not modify arr
  // and why I didn't just sort the array and use the first 2 entries instead of doing this I don't know :D
  let [side1, side2] = [
    ...arr.slice(0, largestSide),
    ...arr.slice(largestSide + 1)
  ];

  return prev +
    (
      ( side1 + side1 + side2 + side2 ) +
      ( l * w * h )
    );
}

// This might not work, but whatever input file you use goes here
fetch('http://adventofcode.com/day/2/input')
  .then(function(response) {
    return response.text();
  })
  .then(function(data) {
    // Again I was solving both problems separately, would be a more efficient way to do this otherwise...
    console.log( 'paper', data.trim().split('\n').reduce(paperReducer, 0) );
    console.log( 'ribbon', data.trim().split('\n').reduce(ribbonReducer, 0) );
  })
  .catch(function(err) {
    console.log(err);
  });
