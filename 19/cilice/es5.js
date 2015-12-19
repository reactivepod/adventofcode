'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _fs = require('fs');

var _stringSplice = require('string-splice');

var _stringSplice2 = _interopRequireDefault(_stringSplice);

var _arrayShuffle = require('array-shuffle');

var _arrayShuffle2 = _interopRequireDefault(_arrayShuffle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var input = (0, _fs.readFileSync)('./input').toString('utf8').trim().split('\n').reduce(function (formula, line) {
  var _line$split = line.split(' => ');

  var _line$split2 = _slicedToArray(_line$split, 2);

  var element = _line$split2[0];
  var replacement = _line$split2[1];

  if (!formula[element]) formula[element] = [];
  formula[element].push(replacement);

  return formula;
}, {});

var formula = 'ORnPBPMgArCaCaCaSiThCaCaSiThCaCaPBSiRnFArRnFArCaCaSiThCaCaSiThCaCaCaCaCaCaSiRnFYFArSiRnMgArCaSiRnPTiTiBFYPBFArSiRnCaSiRnTiRnFArSiAlArPTiBPTiRnCaSiAlArCaPTiTiBPMgYFArPTiRnFArSiRnCaCaFArRnCaFArCaSiRnSiRnMgArFYCaSiRnMgArCaCaSiThPRnFArPBCaSiRnMgArCaCaSiThCaSiRnTiMgArFArSiThSiThCaCaSiRnMgArCaCaSiRnFArTiBPTiRnCaSiAlArCaPTiRnFArPBPBCaCaSiThCaPBSiThPRnFArSiThCaSiThCaSiThCaPTiBSiRnFYFArCaCaPRnFArPBCaCaPBSiRnTiRnFArCaPRnFArSiRnCaCaCaSiThCaRnCaFArYCaSiRnFArBCaCaCaSiThFArPBFArCaSiRnFArRnCaCaCaFArSiRnFArTiRnPMgArF';

var rx = /([a-zA-Z][a-z]*)/g;
var match = undefined;
var matches = [];

while ((match = rx.exec(formula)) !== null) {
  matches = [].concat(_toConsumableArray(matches), [match]);
}

var partOne = matches.reduce(function (data, entry) {
  var index = entry.index;
  var element = entry[0];

  if (input[element]) {
    input[element].forEach(function (replacement) {
      data.push((0, _stringSplice2.default)('' + formula, index, element.length, replacement));
    });
  }

  return data;
}, []).filter(function (item, pos, self) {
  return self.indexOf(item) == pos;
});

console.log(partOne.length);

var reverse = Object.keys(input).reduce(function (table, replacement) {
  input[replacement].forEach(function (element) {
    table[element] = replacement;
  });

  return table;
}, {});

var target = formula;
var partTwo = 0;
var elements = Object.keys(reverse);

while (target !== 'e') {
  var tmp = target;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var element = _step.value;

      var replacement = reverse[element];

      if (target.includes(element)) {
        target = target.replace(element, replacement);
        partTwo = partTwo + 1;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (tmp === target) {
    target = formula;
    partTwo = 0;
    elements = (0, _arrayShuffle2.default)(elements);
  }
}

console.log(partTwo);
