let firstNumber, secondNumber, operator, prevOperation;
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
    storedValues[0] = Number(display.textContent);
    storedValues.pop();
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

    // Clears display while chaining operations
    if (storedValues.length != 0) {
        clearDisplay();
    } 
    displayValue.push(Number(display.textContent));
    displayContainer.appendChild(display);

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

// 




// Checks that display is within its container


