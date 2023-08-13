let firstNumber, secondNumber, operator;


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