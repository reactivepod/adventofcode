function findPositionThatEntersBasement(input) {
  var floor = 0;
  return input.split('').findIndex((direction) => {
    floor += {'(':1,')':-1}[direction] || 0;
    return floor === -1;
  }) + 1;
}
