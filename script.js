function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 - num2;
}

function divide(num1, num2) {
    return num1 - num2;
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
    processInput(event.target.textContent);
    
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

}

function calculate(buttonPress) {
    //calculator container event triggers
    if (buttonPress != '=' && !(OPERATORS.includes(buttonPress))) {
        return '';
    }

    const calculation = screenElement.value;
    const operator = getOperator(calculation);

    if (!operator) {
        return '';
    }

    const pieces = calculation.split(operator);

    if (!pieces[1]) {
        return '';
    }

    return operate(operator, Number(pieces[0]), Number(pieces[1]));

}

function filterDecimalPoint(text) {

    const calculation = screenElement.value;
    const operator = getOperator(calculation);

    if (!operator) {
        return '';
    }

    const pieces = calculation.split(operator);

    if (!pieces[1]) {
        return '';
    }
    
}