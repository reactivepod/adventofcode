function calculateRibbonNeeds(input) {
  var floor = 0;
  return input.split('\n').reduce((sqFt, eq) => {
    var dimensions = eq.split('x').map(n => +n);
    var maxIndex = dimensions.indexOf(Math.max.apply(Math, dimensions));
    return sqFt += dimensions
      .filter((d, index, arr) => index !== maxIndex)
      .map(n => 2 * n)
      .reduce((total, n) => total += n, 0)
      + dimensions.reduce((v, d) => v * d); // volume for bow
  }, 0);
}
