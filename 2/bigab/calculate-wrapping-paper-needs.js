function calculateWrappingPaperNeeds(input) {
  return input.split('\n')
    .reduce((sqFt, eq) => {
      var d = eq.split('x');
      var l = d[0],
        w = d[1],
        h = d[2];
      sqFt += 2 * l * w + 2 * w * h + 2 * h * l;
      sqFt += Math.min(l * w, w * h, h * l); // little extra
      return sqFt;
    }, 0);
}
