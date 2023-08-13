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
const operation = function operate(operator, firstNumber, secondNumber) {
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

// Populates display when number buttons are clicked 
const numbers = document.querySelectorAll('.numbers');

numbers.forEach((number) => {
    number.addEventListener('click', display)
})

function display(e) {
    const displayContainer = document.querySelector('.display-container');
    const display = document.createElement('p');
    display.classList.add('display');
    display.textContent = e.target.textContent;

    displayContainer.appendChild(display);
}