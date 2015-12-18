'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _fs = require('fs');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var input = (0, _fs.readFileSync)('input').toString('utf8').trim();

var parse = function parse(input) {
  var grid = input.split('\n').map(function (s) {
    return ['.'].concat(_toConsumableArray(s), ['.']).map(function (ch) {
      return ch === '#';
    });
  });
  var row = function row() {
    return [].concat(_toConsumableArray(new Array(grid.length + 2))).fill(false);
  };
  return [row()].concat(_toConsumableArray(grid), [row()]);
};

var count = function count(arr) {
  return arr.filter(function (x) {
    return x;
  }).length;
};
var countTotal = function countTotal(arr) {
  return arr.reduce(function (sum, row) {
    return sum + count(row);
  }, 0);
};

var neighbours = function neighbours(x, y) {
  return [[x - 1, y - 1], [x - 1, y], [x - 1, y + 1], [x, y - 1], [x, y + 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]];
};

var iterate = function iterate(n, fn, arg, grid) {
  return [].concat(_toConsumableArray(new Array(n))).reduce(function (x) {
    return fn(x, arg);
  }, grid);
};

var update = function update(grid) {
  var corners = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var result = grid.map(function (row) {
    return [].concat(_toConsumableArray(row));
  });
  var max = grid.length - 2;

  var isCorner = function isCorner(x, y) {
    return corners && (x === 1 || x === max) && (y === 1 || y === max);
  };
  var isOn = function isOn(_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var x = _ref2[0];
    var y = _ref2[1];
    return isCorner(x, y) || grid[x][y];
  };

  for (var i = 1; i <= max; i++) {
    for (var j = 1; j <= max; j++) {
      var on = count(neighbours(i, j).map(isOn));
      result[i][j] = isCorner(i, j) || (grid[i][j] ? on === 2 || on === 3 : on === 3);
    }
  }

  return result;
};

var grid = parse(input);

// console.log( neighbours(2, 2) )
console.log(countTotal(iterate(100, update, false, grid)));
console.log(countTotal(iterate(100, update, true, grid)));
