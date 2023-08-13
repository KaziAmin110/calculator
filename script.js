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

// operation function - takes operator and two numbers and returns operation
function operate(operator, firstNumber, secondNumber) {
    if (operator == addition)
        return addition(firstNumber, secondNumber);
    else if (operator == subtraction)
        return subtraction(firstNumber, secondNumber);
    else if (operate == multiplication)
        return multiplication(firstNumber, secondNumber);
    else if (operate == division)
        return division(firstNumber, secondNumber);
    else
        return "ERROR OPERATING";
}

// Populates display when number buttons are clicked .. stores in display value
let displayValue = [];
let displayValue1 = 0;
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
    displayValue1 = finalVal;
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
}
