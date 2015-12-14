// JUST PASTE INTO DEVTOOLS CONSOLE ON adventofcode.com/day/6/input

// parse english into json
var instructionsInEnglish = document.body.innerText.trim().split('\n')
var instructions = [];
var regex = /(toggle|turn \w{2,3}) (\d+,\d+) through (\d+,\d+)/;
for( var line of instructionsInEnglish ) {
    var captures = line.match( regex );
    var instruction = captures[1];
    var from = captures[2].split(',').map( x => +x );
    var to = captures[3].split(',').map( x => +x );
    instructions.push({ instruction, from, to });
}

// execute instructions
var lights = Array(1e6).fill( 0 );
var dimmer = {
    'turn on':  b => b + 1,
    'turn off': b => b === 0 ? 0 : b - 1,
    'toggle':   b => b + 2,
}
for( var $ of instructions ) {
    var y1 = $.from[1], y2 = $.to[1];
    for( var x = $.from[0]; x <= $.to[0]; x++ ) {
        var replace = lights.slice( x * 1e3 + y1, x * 1e3 + y2 + 1 ).map( dimmer[$.instruction] );
        lights.splice( x * 1e3 + y1, y2 - y1 + 1, ...replace );
    }
    if( lights.length !== 1e6 ) { debugger; break; }
}

// answer
lights.reduce( (total,brightness) => total + brightness, 0 );
