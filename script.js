function add(val1, val2) { return val1 + val2; }
function subtract(val1, val2) { return val1 - val2; }
function multiply(val1, val2) { return val1 * val2; }
function divide(val1, val2) { 
    if (val2 === 0) {
        return 'Error: Division by zero';
    }
    return val1 / val2; 
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return 'Error: Unknown operator';
    }
}

const numberBtn = document.querySelectorAll(".number");
const funcBtn = document.querySelectorAll(".func");
const equalBtn = document.querySelectorAll(".equals");
const windowText = document.querySelector(".windowText");
const clearBtn = document.querySelector(".clear");

let calculatorString = "";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
const funcChars = ["÷", "×", "+", "−"];

funcBtn.forEach(button => {
    button.addEventListener('click', () => {
        let func = button.textContent;
        if (firstOperand !== null && operator !== null && waitingForSecondOperand) {
            // Perform the calculation if an operator is already set and we're waiting for the second operand
            const secondOperand = parseFloat(calculatorString);
            const result = operate(firstOperand, secondOperand, operator);
            windowText.textContent = result;
            firstOperand = result;
            calculatorString = result.toString();
            operator = func === "÷" ? "/" : func === "×" ? "*" : func; // Update the operator
        } else {
            firstOperand = parseFloat(calculatorString);
            operator = func === "÷" ? "/" : func === "×" ? "*" : func; // Update the operator
            waitingForSecondOperand = true;
        }
        calculatorString = "";
    });
});

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        let text = button.textContent;
        if (windowText.textContent === "0" || waitingForSecondOperand) {
            calculatorString = text; // Replace leading zero or clear input for second operand
            waitingForSecondOperand = false;
        } else if (windowText.textContent.length <= 12) {
            calculatorString += text;
        }
        windowText.textContent = calculatorString;
    });
});

equalBtn.forEach(button => {
    button.addEventListener('click', () => {
        if (operator !== null && firstOperand !== null) {
            const secondOperand = parseFloat(calculatorString);
            const result = operate(firstOperand, secondOperand, operator);
            windowText.textContent = result;
            firstOperand = result;
            calculatorString = result.toString();
            operator = null;
        }
    });
});

clearBtn.addEventListener('click', () => {
    calculatorString = "";
    windowText.textContent = "0";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
});
