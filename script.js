'use strict';

//оголошуємо змінні
const input = document.querySelector('.input');
const operator = document.querySelectorAll('.operator');
const number = document.querySelectorAll('.number');
const result = document.querySelector('.result');
const clear = document.querySelector('.clear');
let resultDisplayed = false; //значення для контролю, чи юзер вже бачить результат операції чи ні


// обробки математичних операцій
//додамо обробника подій для всіх кнопок з математичними операторами
for( let i = 0; i < operator.length; i++ ) {
	operator[i].addEventListener('click', function(event){
		const currentString = input.innerHTML;
		const lastChar = currentString[currentString.length - 1];
		// умова перша - якщо юзер ввів математичний оператор і знову вводить мат.опер, то ми його заміняємо
		if(lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷' || lastChar === '.') {
			const newString = currentString.substring(0, currentString.length - 1) + event.target.innerHTML;
			input.innerHTML = newString;
		} else if (currentString.length === 0) {
		// якщо юзер першим символом ввів оператор, то ми нічого не будемо робити
		return null;
		} else {
			input.innerHTML = input.innerHTML + event.target.innerHTML;
		}
	});
};

// обробка введення чисел
for( let i = 0; i < number.length; i++ ) {
	number[i].addEventListener('click', function(event){
		const currentString = input.innerHTML;
		const lastChar = currentString[currentString.length - 1];
		if(resultDisplayed === false) {
			input.innerHTML += event.target.innerHTML;
		} else if (resultDisplayed === true && lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
			resultDisplayed = false;
			input.innerHTML += event.target.innerHTML;
		} else {
			resultDisplayed = false;
			input.innerHTML = '';
			input.innerHTML += event.target.innerHTML;
		}
	});
};
// очищення
clear.addEventListener('click', function(){
	input.innerHTML = '';
});

// отримання результату
result.addEventListener('click', function(){
	const inputString = input.innerHTML;
	// console.log(inputString);
	
	const lastChar = inputString[inputString.length - 1];
	if(lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷' || lastChar === '.') {
	return null
	};

	const numbers = inputString.split(/\+|\-|\×|\÷/g);
	// console.log(numbers);

	const operators = inputString.replace(/[0-9]|\./g, '').split('');
	// console.log(operators);

	let multiply = operators.indexOf('×');
	while (multiply !== -1) {
		numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply+1]);
		operators.splice(multiply, 1);
		multiply = operators.indexOf('×');
	};

	let divide = operators.indexOf('÷');
	while (divide !== -1) {
		numbers.splice(divide, 2, numbers[divide] / numbers[divide+1]);
		operators.splice(divide, 1);
		divide = operators.indexOf('÷');
	};

	let add = operators.indexOf('+');
	while (add !== -1) {
		numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add+1]));
		operators.splice(add, 1);
		add = operators.indexOf('+');
	};

	let substract = operators.indexOf('-');
	while (substract !== -1) {
		numbers.splice(substract, 2, numbers[substract] - numbers[substract+1]);
		operators.splice(substract, 1);
		substract = operators.indexOf('-');
	};

	input.innerHTML = numbers[0];
	resultDisplayed = true;
});


