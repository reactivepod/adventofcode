'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _fs = require('fs');

let i = 0;

const reg = {
  a: 1,
  b: 0
};

const input = (0, _fs.readFileSync)('./input').toString('utf8').trim().split('\n').map(s => s.match(/([^, ]+)/g));

const ops = {
  hlf: x => reg[x] = reg[x] >> 1,
  tpl: x => reg[x] = reg[x] * 3,
  inc: x => reg[x] = reg[x] + 1,
  jmp: x => i = i + Number(x) - 1,
  jie: (x, y) => i = reg[x] % 2 === 0 ? i + Number(y) - 1 : i,
  jio: (x, y) => i = reg[x] === 1 ? i + Number(y) - 1 : i
};

while (i < input.length) {
  var _input$i = _slicedToArray(input[i], 3);

  let op = _input$i[0];
  let x = _input$i[1];
  let y = _input$i[2];

  ops[op](x, y);
  i = i + 1;
}

console.log(reg);
