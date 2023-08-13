let firstNumber, secondNumber, operator;
// Addition, subtraction, multiplication, division functions
const addition = function add(a, b) {
    return a + b;
}

const subtraction = function subtract(a, b) {
    return a - b;
}

const multiplication = function multiply(a, b) {
    return a * b;
}

const division = function divide(a, b) {
    return a / b;
}


function getOperation(e) {
    operationValue = e.target.textContent;
}

// operation function - takes operator and two numbers and returns operation
function operate() {
    const displayContainer = document.querySelector('.display-container');
    const display = document.createElement('p');
    display.classList.add('display');
    storesDisplay();


    if (operationValue == '+')
        display.textContent = addition(storedValues[0], storedValues[1]);
    else if (operationValue == '-')
        display.textContent = subtraction(storedValues[0], storedValues[1]);
    else if (operationValue == 'x')
        display.textContent = multiplication(storedValues[0], storedValues[1]);
    else if (operationValue == '/')
        display.textContent = division(storedValues[0], storedValues[1]);
    else
        return "ERROR OPERATING";
    
    clearDisplay();
    displayContainer.appendChild(display);
    

}

// Populates display when number buttons are clicked .. stores in display value
let displayValue = [];
let storedValues = [];
const numbers = document.querySelectorAll('.numbers');

numbers.forEach((number) => {
    number.addEventListener('click', display);
})

function display(e) {
    const displayContainer = document.querySelector('.display-container');
    const display = document.createElement('p');
    display.classList.add('display');
    display.textContent = e.target.textContent;

    displayValue.push(Number(display.textContent));
    displayContainer.appendChild(display);

}

const operands = document.querySelectorAll('.operand');

operands.forEach((operand) => {
    operand.addEventListener('click', storesDisplay);
})

function storesDisplay() {
    let finalVal = 0;
    let power = displayValue.length - 1;
    for (let i = 0; i < displayValue.length; i++) {
        finalVal += (displayValue[i] * Math.pow(10, power));
        power--;
    }

    clearDisplay();
    storedValues.push(finalVal);
}

// Clears display when AC button is clicked

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearDisplay);

function clearDisplay() {
    const displayContainer = document.querySelector('.display-container');
    const numbers = document.querySelectorAll('.display');

    numbers.forEach((number) => {
        displayContainer.removeChild(number);
    })

    displayValue.splice(0,displayValue.length);
}

// Determines operation value

let operationValue = '';
const operations = document.querySelectorAll('.operand');
operations.forEach((operation) => {
    operation.addEventListener('click', getOperation);
})

// Performs operation when the equal key is pressed

const equalKey = document.querySelector('.equal');
equalKey.addEventListener('click', operate);
