function floorTraversalParse(input) {
  return input.split('').reduce((floor, direction) => {
    floor += {'(':1,')':-1}[direction] || 0;
    return floor;
  }, 0);
}
