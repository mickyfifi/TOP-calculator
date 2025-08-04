function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

const OPERATORS = '+-*/';
let isResultDisplayed = false;

function operate(operator, num1, num2) {
    switch(operator){
        case '+' :
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);     
    }        

}

function getOperator(text) {
    const index = text.search(/(\+|\-|\*|\/)/);
    if (index < 0) {
        return '';
    }

    return text[index];
}

function clear() {
    screenElement.value = '';
    isResultDisplayed = false;
}

const calculatorElement = document.querySelector('#calculator');
const screenElement = document.querySelector('#screen');

calculatorElement.addEventListener('click', (event) => {
    
    if (event.target.nodeName == 'BUTTON') {
        processInput(event.target.textContent);
    }
    
});

function processInput(input) {
    if (input == 'Del') {
        const arr = screenElement.value.split('');
        arr.pop();
        screenElement.value = arr.join('');
        return;
    }

    if (input == 'C') {
        clear();
        return;
    }

    let equals = calculate(input);
    if (equals) {
        screenElement.value = equals;
        isResultDisplayed = true;
    }

    if (input == '=') {
        return;
    }

    if (input.match(/[0-9.]/) && isResultDisplayed) {
        clear();
    }

    screenElement.value += input;

    screenElement.value = filterDecimalPoint(screenElement.value);
    
}

function calculate(buttonPress) {
    //calculator container event triggers
    if (buttonPress != '=' && !(OPERATORS.includes(buttonPress))) {
        return '';
    }

    const formulaValues = getFormulaValues(screenElement.value);


    if ( (!('operator' in formulaValues)) || (!('secondNumber' in formulaValues))) {
        return '';
    }

    return operate(formulaValues.operator, formulaValues.firstNumber, formulaValues.secondNumber);

}

function getFormulaValues(text) {
    if (!text || text == null) {
        return null;
    }

    const operator = getOperator(text);

    if (!operator) {
        return {'firstNumber': text};
    }

    const pieces = text.split(operator);

    if (!pieces[1]) {
        return {'firstNumber': pieces[0], 'operator': operator};
    }

    return {'firstNumber': pieces[0], 'operator': operator, 'secondNumber': pieces[1]};


}

function filterDecimalPoint(text) {

    const formulaValues = getFormulaValues(screenElement.value);

    if (!formulaValues) {
        return '';
    }

    let firstNumber = removeDuplicateDecimalPoints(formulaValues.firstNumber);

    if (!('operator' in formulaValues)) {
        return firstNumber;
    }


    if (!('secondNumber' in formulaValues)) {
        return firstNumber + formulaValues.operator;
    }

    let secondNumber = removeDuplicateDecimalPoints(formulaValues.secondNumber);

    return firstNumber + formulaValues.operator + secondNumber;

}

function removeDuplicateDecimalPoints(text) {
    const DecimalPointCount = countDecimalPoint(text);

    if (DecimalPointCount < 2) {
        return text;
    }

    const indexOfFirstDP = text.indexOf('.');
    const otherDPString = text.slice(indexOfFirstDP + 1).replaceAll('.', '');

    return text.slice(0, indexOfFirstDP + 1) + otherDPString;

}

function countDecimalPoint(text) {
    const decimalPoint = text.match(/\./g);

    if (!decimalPoint) {
        return 0;
    }

    return decimalPoint.length;
}