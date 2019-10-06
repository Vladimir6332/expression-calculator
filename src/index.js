function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let operations = {
        '+' : function(a, b) {return a + b;},
        '-' : function(a, b) {return a - b;},
        '*' : function(a, b) {return a * b;},
        '/' : function(a, b) { if (b === 0) throw 'TypeError: Division by zero.'; return a / b;},
        '(' : true,
        ')' : true,
    };
    let bracketsConfig = {
        '(' : 1,
        ')' : -1,
    }
    let counter = 0;
    let arrChars = expr.split("");

    // function calculate simple expression without brackets
    let calculate = function(arrExpr) {
        for (let i = 0; i < arrExpr.length; i++) {
            if (arrExpr[i] === '*' || arrExpr[i] === '/') {
                arrExpr.splice(i - 1, 3, operations[arrExpr[i]](+arrExpr[i - 1], +arrExpr[i + 1]));
                i--;
            };
        };
        for (let i = 0; i < arrExpr.length; i++) {
            if (arrExpr[i] === '+' || arrExpr[i] === '-') {
                arrExpr.splice(i - 1, 3, operations[arrExpr[i]](+arrExpr[i - 1], +arrExpr[i + 1]));
                i--;
            };
        };
        if (arrExpr.length === 1)
            return arrExpr[0];
        
    };
    
    //string to arr
    for (let i = 0; i < arrChars.length; i++) {
        if (arrChars[i] === " ") {
            arrChars.splice(i, 1);
            i--;            
        }
         else if (!operations[arrChars[i]] && arrChars[i - 1] && !operations[arrChars[i - 1]]) {
            arrChars.splice(i - 1, 2, arrChars[i - 1].concat(arrChars[i]));
            i--;
        };
    };
    
    //check brackets
    for (let i = 0; i < arrChars.length; i++) {                
        if (bracketsConfig[arrChars[i]]) counter += bracketsConfig[arrChars[i]];
        if (counter < 0) throw 'ExpressionError: Brackets must be paired';        
    };
    if (counter > 0) throw 'ExpressionError: Brackets must be paired';

    // main calculating
    
    let arrExpr = [];
    let indexOpenBracket;
    for (let i = 0; i < arrChars.length; i++) {
        if (arrChars[i] === ')') {
            {
                indexOpenBracket = arrChars.lastIndexOf('(', i);
                arrExpr = arrChars.splice(indexOpenBracket, i - indexOpenBracket + 1);
                arrChars.splice(indexOpenBracket, 0, calculate(arrExpr.splice(1, arrExpr.length - 2)));
                i = indexOpenBracket;          
                
            };
        };
        

    }


    

    return calculate(arrChars);   


    // let exprCalculate = function(expr) {
    //     for (;;) {

    //     }
    // }

}

module.exports = {
    expressionCalculator
}