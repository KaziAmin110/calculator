let firstNumber, secondNumber, operator, prevOperation;
let isResultStored = false;
let decimalCount = 0;
// Addition, subtraction, multiplication, division functions
const addition = function add(a, b) {
    // Checks whether given number values are defined 
    if (isUndefined(a, b)) {
        return 0;
    }

    return a + b;
}

const subtraction = function subtract(a, b) {
    if (isUndefined(a, b))
        return 0;
    return a - b;
}

const multiplication = function multiply(a, b) {
    if (isUndefined(a, b))
        return 0;
    return a * b;
}

const division = function divide(a, b) {
    return a / b;
}


function getOperation(e) {
    // getOperation for keyboard event 
    if (e.type == 'keydown') {
        // First Operand
        if (operationValue == '') {
            // Converts * event into x for operate function
            if (e.key == '*')
                operationValue = 'x';
            else
                operationValue = e.key;
        }
        // Chain operand    
        else {
            // Converts * event into x for operate function
            if (e.key == '*') {
                operate();
                operationValue = 'x';
            }
                
            else {
                operate();
                operationValue = e.key;
            }
        }
    }
    else {
        if (operationValue == '')
            operationValue = e.target.textContent;

        else {
            operate();
            operationValue = e.target.textContent;
        }
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
        
    
    // Rounds Numbers for values over 16 digits
    if (isLargeNum(Number(display.textContent))) {
        display.textContent = roundNumber(Number(display.textContent));
        storedValues[0] = display.textContent;
    }   
    else if (display.textContent == "NaN") {
        display.textContent = "ERROR";
        storedValues.pop();
    }
    else {
        storedValues[0] = Number(display.textContent);
    }
    
    // Check for Operand Division
    if (storedValues.length == 2)
        storedValues.pop();

    displayContainer.appendChild(display);    
    isResultStored = true;
    operationValue = '';
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

    // Sets textContent for keyboard event
    if (e.type == 'keydown') {
        
        if (isNumber(e.key)) {
            display.textContent = e.key;
        }
        else if (isOperand(e.key)) {
            storesDisplay();
            getOperation(e);
            return;
        }
        else if (isBackspace(e.key)) {
            deleteNum();
            return;
        } 
        // Enter key event (=)
        else if (e.key == 'Enter') {
            // Prevents default event of enter key
            e.preventDefault();
            operate();
            return;
        }
        else
            return;
    }
    // Sets textContent for click event
    else
        display.textContent = e.target.textContent;
    
    // Checks if Chaining is occuring (Result already in storedValues) ? clears : continues
    if (isResultStored == true) {
        clearDisplay();
        isResultStored = false;
    }
    
    // Makes Sure Overflow doesnt occcur .. if not appends to display container
    const totalDivs = document.querySelectorAll('.display');
    if (totalDivs.length < 16) {
        // Checks for decimal in displayValues arr if exists append to display
        if (display.textContent.includes('.')) {
            
            // Check for one decimal point per displayValues
            decimalCount += 1;
            display.textContent = '.';
            
            if (decimalCount > 1)
                return;

            displayValue.push(display.textContent);
        }
        else
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
    let storedNum = 0;
    let isDecimal = false;
    let power = 0;
    let decimalLocation = -1;
    
    // Removes last element if last index of displayValue is a decimal
    if (displayValue[displayValue.length - 1] == '.')
        displayValue.pop();

    // checks if a decimal point is present in displayvalue
    for (let i = 0; i < displayValue.length; i++) {
        if (displayValue[i] == '.') {
            decimalLocation = i;
            isDecimal = true;
        }        
    }
    // Decimal values
    if (isDecimal) {
        power = decimalLocation - 1;
        storedNum = convertDisplay(power);

        // Adds the numbers after decimal place
        let afterDecimal = '';

        for (let i = decimalLocation + 1; i < displayValue.length; i++) {
            afterDecimal += displayValue[i];
        }

        // Appends stored nums with after decimal numbers
        storedNum += Number(`.${afterDecimal}`);
    }
    // Regular Integers
    else {
        power = displayValue.length - 1;
        storedNum = convertDisplay(power);
    }
    

    clearDisplay();
    if (storedNum != 0)
        storedValues.push(storedNum);
    
    isDecimal = false;
    decimalCount = 0;
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
    decimalCount = 0;
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

// Delete / Backspace key functionality
const deleteKey = document.querySelector('.backspace');
deleteKey.addEventListener('click', deleteNum);

function deleteNum() {
    
    // Checks for empty displayValues arr if so resets calculator
    if (displayValue.length == 0) {
        clearAC();
        return;
    }
    
    // Removes last element from display-container and displayValues array
    const displayContainer = document.querySelector('.display-container');
    displayContainer.removeChild(displayContainer.lastElementChild);

    displayValue.pop();
}

// Add Keyboard functionality

const keyboardButtons = document.querySelectorAll('.button');
keyboardButtons.forEach((button) => {
    button.addEventListener('keydown', display);
})


// Rounds a Given Exponential Number to four decimal places .. Returns a rounded number

function roundNumber(number) {
    return number.toExponential(11);
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


// check if values are undefined

function isUndefined(a, b) {
    if (a == undefined || b == undefined) 
        return true;
    return false;
}

// Returns array of integers in displayValue array into one integer value
// Returns only the integer part of an array for decimal displayValues

function convertDisplay(power) {
    let finalVal = 0; 
    let length = power + 1;
    for (let i = 0; i < length; i++) {
        finalVal += (displayValue[i] * Math.pow(10, power));
        power--;
    }

    return finalVal;
}

function isNumber(key) {
    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            return true;
        default:
            return false;
    }
}

function isOperand(key) {
    switch (key) {
        case '+':
        case '-':
        case '/':
        case '*':
        case '=':
            return true; 
        default:
            return false;
    }
}

function isBackspace(key) {
    if (key == 'Backspace')
        return true;
    else
        return false;
}