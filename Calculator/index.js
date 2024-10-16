let currentInput = '';
let operator = '';
let firstOperand = null;

function load() {
    const keys = document.querySelectorAll('.keys span');
    keys.forEach(key => {
        key.addEventListener('click', handleKeyClick);
    });

    document.getElementById('clear').addEventListener('click', clear);
}

function handleKeyClick(event) {
    const value = event.target.textContent;

    if (value === '=') {
        evaluate();
    } else if (['+', '-', 'x', '÷'].includes(value)) {
        setOperator(value);
    } else {
        updateInput(value);
    }
}

function updateInput(value) {
    currentInput += value;
    display(currentInput);
}

function setOperator(value) {
    if (currentInput === '') return;
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else {
        evaluate();
    }
    operator = value === 'x' ? '*' : value === '÷' ? '/' : value; // Normalize operators
    currentInput = '';
}

function evaluate() {
    if (firstOperand === null || currentInput === '' || operator === '') return;

    const secondOperand = parseFloat(currentInput);
    calculate(firstOperand, secondOperand, operator)
        .then(result => display(result))
        .catch(error => display(error));
}

function calculate(num1, num2, operation) {
    return new Promise((resolve, reject) => {
        switch (operation) {
            case '+':
                resolve(num1 + num2);
                break;
            case '-':
                resolve(num1 - num2);
                break;
            case 'x':
            case '*':
                resolve(num1 * num2);
                break;
            case '÷':
            case '/':
                if (num2 === 0) {
                    reject("Error: Cannot divide by zero");
                } else {
                    resolve(num1 / num2);
                }
                break;
            default:
                reject("Error: Invalid operation");
        }
    });
}

function clear() {
    currentInput = '';
    firstOperand = null;
    operator = '';
    display('');
}

function display(value) {
    document.getElementById('screen').textContent = value;
}

// Custom iterator for squaring numbers
function* squareIterator(numbers) {
    for (let num of numbers) {
        yield num * num;
    }
}

// Generate squares of an array of numbers
const numbers = [1, 2, 3, 4, 5];
const squares = squareIterator(numbers);
console.log("Squares of the array:");
for (let square of squares) {
    console.log(square);
}

// Generator function for prime numbers
function* primeGenerator(limit) {
    let num = 2;
    while (num <= limit) {
        if (isPrime(num)) {
            yield num;
        }
        num++;
    }
}

// Helper function to check for prime numbers
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Generate prime numbers up to a limit
const limit = 20; // Example limit
const primes = primeGenerator(limit);
console.log(`Prime numbers up to ${limit}:`);
for (let prime of primes) {
    console.log(prime);
}
