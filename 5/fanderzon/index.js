var fs = require('fs');

fs.readFile('./input.txt', 'utf8', function readInput(err, data) {
  const input = data.trim().split('\n'),
    vowelRe = /[aeiou]/,
    doubleRe = /([a-z])\1{1}/,
    excludeRe = /ab|cd|pq|xy/,
    recurringPairRe = /([a-z]{2})[a-z]*\1/,
    recurringSeparatedCharsRe = /([a-z]{1})[a-z]{1}\1/;

  function vowelCountFilter(str) {
    return str.trim().split('').filter(char => vowelRe.test(char)).length > 2;
  }

  function doubleCharFilter(str) {
    return doubleRe.test(str);
  }

  function excludePairsFilter(str) {
    return !excludeRe.test(str);
  }

  function recurringPairFilter(str) {
    return recurringPairRe.test(str);
  }

  function recurringSeparatedCharsFilter(str) {
    return recurringSeparatedCharsRe.test(str);
  }

  console.log( 'Matches for first set of crazy rules',
    input
      .filter(vowelCountFilter)
      .filter(doubleCharFilter)
      .filter(excludePairsFilter)
      .length
  );

  console.log( 'Matches for second set of crazy rules',
    input
      .filter(recurringPairFilter)
      .filter(recurringSeparatedCharsFilter)
      .length
  );


});
