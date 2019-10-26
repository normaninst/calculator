const calculator = {
    displayValue: '0',
    firstNum: null,
    secondNum: null,
    operator: null,
    decimal: null,
    waitingForNum: false,
};

const buttons = document.querySelectorAll("button")

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;


function operate (operator, firstNum, secondNum) {
        switch (operator) {
            case '+':
                return add(firstNum, secondNum);
            case '-':
                return substract(firstNum, secondNum);
            case '*':
                return multiply(firstNum, secondNum);
            case '/':
                return divide(firstNum, secondNum);
        }
};
 

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstNum = null;
    calculator.operator = null;
    calculator.secondNum = null;
    calculator.decimal = null;
};


function inputDigit(digit) {
    const { displayValue, waitingForNum } = calculator;

    if (waitingForNum == true) {
        calculator.displayValue = digit;
        calculator.waitingForNum = false;
    }
    else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
};

function updateDisplay () {
    const display = document.querySelector(".display");
    display.value = calculator.displayValue;

};

const backspace = () => calculator.displayValue = calculator.displayValue.slice(0, -1);

function decimal () {
    calculator.displayValue = calculator.displayValue + '.';
    calculator.decimal = '.';
};

function checkZero () {
    if (calculator.operator == '/' && (calculator.firstNum == 0 || calculator.secondNum == 0 )) {
        calculator.displayValue = '0';
        alert('Trying to divide by zero ? Take a look at this if you want to know why that is disallowed:\nhttp://mathforum.org/dr.math/faq/faq.divideby0.html');
    }
};

function checkOperator (nextOperator) {
    const {firstNum, displayValue, operator} = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForNum) {
        calculator.operator = nextOperator;
        return;
    }
    if (firstNum == null) {
        calculator.firstNum = inputValue;
    }
    else if (operator) {
        const currentValue = firstNum || 0;
        calculator.secondNum = currentValue;
        const result = operate(operator, currentValue, inputValue);
        calculator.displayValue = result.toString();
        calculator.firstNum = result;
        updateDisplay();
    }
    calculator.waitingForNum = true;
    calculator.operator = nextOperator;
}


buttons.forEach ((button) => {
    button.addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) {
            return;
        }
        if (target.classList.contains('operator')) {
            checkOperator(target.value)
            return; 
        }
        if (target.classList.contains('decimal') && calculator.decimal == null) {
            decimal();
            updateDisplay();
            return;
        }
        if (target.classList.contains('backspace')) {
            backspace();
            updateDisplay();
            return;
        }
        if (target.classList.contains('equal')) {
            if (calculator.firstNum != null) {
                checkOperator(calculator.operator)
                checkZero();
                updateDisplay();
                return;
            }
        }
        if (target.classList.contains('clear')) {
            resetCalculator();
            updateDisplay();
            return;
        }
        inputDigit(target.value)
        updateDisplay();
    });
});

updateDisplay();





