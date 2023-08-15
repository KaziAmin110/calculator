let firstNumber, secondNumber, operator, prevOperation;
let isResultStored = false;
let startingWidth = 15;
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

    if (operationValue == '')
        operationValue = e.target.textContent;
    else {
        operate();
        operationValue = e.target.textContent;
    }
    
    
    
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

    operationValue = '';

    
    
    // Rounds Numbers for values over 16 digits
    if (isLargeNum(Number(display.textContent))) {
        display.textContent = roundNumber(Number(display.textContent));
        storedValues[0] = display.textContent;
    }   
    else {
        storedValues[0] = Number(display.textContent);
    }

    storedValues.pop();
    displayContainer.appendChild(display);
    isResultStored = true;
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

    // Checks if Chaining is occuring (Result already in storedValues) ? clears : continues
    if (isResultStored == true) {
        clearDisplay();
        isResultStored = false;
    }

    // Makes Sure Overflow doesnt occcur .. if not appends to display container
    const totalDivs = document.querySelectorAll('.display');
    if (totalDivs.length < 16) {
        displayValue.push(Number(display.textContent));
        displayContainer.appendChild(display);
    }

}

// Converts display value array into numbers within storedValues
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
    if (finalVal != 0)
        storedValues.push(finalVal);
    

}

// Clears display when AC button is clicked

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearAC);

function clearAC () {
    const displayContainer = document.querySelector('.display-container');
    const numbers = document.querySelectorAll('.display');
    
    numbers.forEach((number) => {
        displayContainer.removeChild(number);
    })

    operationValue = '';
    displayValue.splice(0,displayValue.length);
    storedValues.splice(0,storedValues.length);
    isResultStored = false;
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


// Clears only the displayValue (Used in Operations where the storedValues are still utilized)
function clearDisplay() {
    const displayContainer = document.querySelector('.display-container');
    const numbers = document.querySelectorAll('.display');

    numbers.forEach((number) => {
        displayContainer.removeChild(number);
    })

    displayValue.splice(0,displayValue.length);

}

// Rounds a Given Exponential Number to four decimal places .. Returns a number

function roundNumber(number) {
    return number.toExponential(12);
}

// Checks if given number is over 16 digits 

function isLargeNum(number) {
    let count = 0;
    
    while (number > 0) {
        number = Math.floor(number / 10);
        count++;
    }

    return (count > 16) ? true : false;
}


