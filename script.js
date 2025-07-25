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

let num1 = 0;
let num2 = 0;
let operator = '';
const OPERATORS = '+-*/';

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

const calculatorElement = document.querySelector('#calculator');
const screenElement = document.querySelector('#screen');

calculatorElement.addEventListener('click', (event) => {
    if (event.target.textContent == 'C') {
        screenElement.value = '';
        return;
    }
    

    let equals = calculate(event.target.textContent);
    if (equals) {
        screenElement.value = equals;
    }

    if (event.target.textContent == '=') {
        return;
    }

    if (event.target.localName == 'button') {
        screenElement.value += event.target.textContent;
    }
    
});

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