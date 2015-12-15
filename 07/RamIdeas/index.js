function day7( part2 ) {
    'use strict';

    const instructions = document.body.innerText.trim().split('\n');
    
    const replacement = {
        AND: '&',
        OR: '|',
        LSHIFT: '<<',
        RSHIFT: '>>',
        NOT: 'Math.pow(2,16) + ~',
    }
    
    const cache = {};
    
    const functions = instructions.map( instruction => {
        const sides = instruction.match(/^(.+) -> ([a-z]+)$/);
        const target = sides[2];
        const input = sides[1]
                .replace( /([a-z]+)/g, 'get_$1()' )
                .replace( /AND|OR|LSHIFT|RSHIFT|NOT/, operator => replacement[operator] );
      
        return `function get_${target}() { return cache.${target} = cache.${target} || ${input} }`;
    });
    
    const code = `
        ${ functions.join('\n') }
        // override get_b() in Part Two only
        ${ part2 ? '' : '//' } function get_b() { return 956 }
        get_a();
    `;
    return eval( code );

}

console.log( 'Part One:', day7(false) );
console.log( 'Part Two:', day7(true) );
