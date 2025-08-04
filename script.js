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
let result = 'result';

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

function hasLongDecimals(number, minDecimalLength = 5) {
  if (typeof number !== 'number' || isNaN(number)) {
    return false;
  }

  const numString = number.toString();
  const parts = numString.split('.');

  if (parts.length < 2) {
    return false;
  }

  const decimalPart = parts[1];
  return decimalPart.length >= minDecimalLength;
}

const calculatorElement = document.querySelector('#calculator');
const screenElement = document.querySelector('#screen');

calculatorElement.addEventListener('click', (event) => {
    
    if (event.target.nodeName == 'BUTTON') {
        processInput(event.target.textContent);
    }
    
});

document.addEventListener('keydown', (event) => {

    let input = event.key;

    if (event.key == 'Backspace') {
        input = 'Del';
    }

    if (event.key == 'c') {
        input = 'C';
    }

    if (event.key == 'Enter') {
        input = '=';
    }

    processInput(input);
});

function processInput(input) {
    const inputsAllowed = /^[0-9]|\+|\-|\*|\/|\=|\.|Del|C$/;

    if (!(input.match(inputsAllowed))) {
        return;
    }

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
         
        if (hasLongDecimals(Number(equals))) {
            equals = Math.floor(Number(equals) * 100) / 100;
            equals = equals.toString()
            console.log('has long decimal -> ' + equals);
        }

        screenElement.value = equals;
        result = equals;
    }

    if (input == '=') {
        return;
    }

    if (input.match(/[0-9.]/) && result == screenElement.value) {
        clear();
        result = 'result';
    }

    screenElement.value += input;

    if (result != screenElement.value) {
        result = 'result';
    }

    screenElement.value = filterDecimalPoint(screenElement.value);
    
}

function calculate(buttonPress) {
    //calculator container event triggers
    if (buttonPress != '=' && !(OPERATORS.includes(buttonPress))) {
        return '';
    }

    const formulaValues = getFormulaValues(screenElement.value);

    if ( (!formulaValues) || (!('operator' in formulaValues)) || (!('secondNumber' in formulaValues))) {
        return '';
    }

    return operate(formulaValues.operator, Number(formulaValues.firstNumber), Number(formulaValues.secondNumber));

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