let add = (a, b) => {
    return a + b;
}
let subtract = (a, b) => {
    return a - b;
}
let multiply = (a, b) => {
     return a * b;
 }
let divide = (a, b) => {
    if (b == 0) {
        return 'ERROR';
    } else {
        return a / b;
    }
}
let operate = (a, b, operator) => {
    switch (operator) {
        case 'add':
            return add(a, b);
            break;
        case 'subtract':
            return subtract(a, b);
            break;
        case 'multiply':
            return multiply(a, b);
            break;
        case 'divide':
            return divide(a, b);
            break;
        default:
            return 0;
    }
}

//Declare element
let display = '0';
let currentOperator = '';
const calculation = document.getElementById('calculation');
const clearBtn = document.getElementById('clear');
const floatBtn = document.getElementById('float');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalBtn = document.getElementById('equal');
const backBtn = document.getElementById('back');

//Declare function
let clear = () => {
    currentOperator = '';
    display = '0';
    calculation.innerText = display;
}
let addNumber = (number) => {
    display += number;
    calculation.innerText = display;
}
let addFloat = () => {
    let addFloat = true;
    for (let i = display.length - 1; i >= 0; i--) {
            if  (display[i] == '.') {
                addFloat = false;
                break;
            } else if (display[i] == ' '){
                if (i == display.length) {
                    display += '0';
                }
                break;
            }
    }
    if (addFloat == true) {
        display += '.';
        calculation.innerText = display;
    }
}
let addOperator = (operator) => {
    if (display !== '') {
        if (display[display.length - 1] == ' ') {
            display = display.slice(0, display.indexOf(' '));
        } else if (display[display.length - 1] == '.') {
            display = display.slice(0, -1);
        }
        display += ' ' + operator + ' ';
        calculation.innerText = display;
    }
}
let equal = () => {
    if (display[display.length - 1] !== ' ' && currentOperator != '') {
        let displayList = display.split(' ');
        display = operate(+displayList[0], +displayList[2], currentOperator);
        calculation.innerText = display;
        if (display == 'ERROR') {
            display = '0';
        }
        currentOperator = '';
    }
}
let back = () => {
    if (display !== '0') {
        if (display[display.length - 1] == ' ') {
            display = display.slice(0, display.length - 3);
            currentOperator = '';
        } else {
            display = display.slice(0, display.length - 1);
        }
    }
    calculation.innerText = display;
}
//Add function to buttons
clearBtn.addEventListener('click', clear);
floatBtn.addEventListener('click', addFloat);
equalBtn.addEventListener('click', equal);
backBtn.addEventListener('click', back);
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        addNumber(e.target.innerText);
    })
})
operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if (currentOperator !== '') {
            equal();
        }
        currentOperator = e.target.id;
        addOperator(e.target.innerText);
    })
})
