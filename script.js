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

function operate(operator, num1, num2) {
    switch(operator){
        case 0 :
            add(num1, num2);
            break;
        case 1:
            subtract(num1, num2);
            break;
        case 2 :
            multiply(num1, num2);
            break;
        case 3:
            divide(num1, num2);
            break;     
    }
        

}

function populate() {

}

const calculatorElement = document.querySelector('#calculator');
const screenElement = document.querySelector('#screen');

calculatorElement.addEventListener('click', (event) => {
    if (event.target.localName == 'button') {
        screenElement.value += event.target.textContent;
    }

    if (event.target.textContent == 'C') {
        screenElement.value = '';
    }


});