"use strict";

// оголошуємо змінні
const input = document.querySelector('.input');
const operator = document.querySelectorAll('.operator');
const number = document.querySelectorAll('.number');
const result = document.querySelector('.result');
const clear = document.querySelector('.clear');
let resultDisplayed = false; // значення для контролю чи юзер вже бачить результат операцій чи ще ні

// функції для обробки математичних операцій
// додамо обробники подій для всіх кнопок з математичними операторами
for( let i = 0; i < operator.length; i++) {
	operator[i].addEventListener('click', function(event){
		// отримуємо доступ до введеної операції
		const currentString = input.innerHTML;
		// отримуємо доступ до останнього введеного значення в операції
		const lastChar = currentString[currentString.length - 1];
		// якщо юзер вже ввів математичний оператор останнім значенням 
		if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷' || lastChar === '.') {
			// то ми його замінюємо
			const newString = currentString.substring(0, currentString.length - 1) + event.target.innerHTML;
			input.innerHTML = newString;
		} else if (currentString.length === 0) {
			// якщо юзер першим символом ввів оператор, то ми нічого не будемо робити
			return null;
		} else {
			// у всіх інших випадках - додаємо оператор до кінця рядку
			input.innerHTML += event.target.innerHTML;
		}
	});
}

// додамо обробники подій для всіх кнопок з числами
for( let i = 0; i < number.length; i++) {
	number[i].addEventListener('click', function(event){
		// отримуємо доступ до введеної операції
		const currentString = input.innerHTML;
		// отримуємо доступ до останнього введеного значення в операції
		const lastChar = currentString[currentString.length - 1];
		// якщо юзер просто вводить число - то ми його додаємо до введеної операції
		if (resultDisplayed === false) {
			input.innerHTML += event.target.innerHTML;
		}  else if (resultDisplayed === true && lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
			// якщо юзер вводить число коли вже висвічується результат попередньої операції і є оператор останнім символом
			// ставимо позначку що це вже не результат попередньої введеної операції
			resultDisplayed = false;
			//а введене число додаємо до введеної операції
			input.innerHTML += event.target.innerHTML;
		} else {
			// якщо юзер вводить число коли відображається результат попередньої операції
			// ставимо позначку що це вже не результат попередньої введеної операції
			resultDisplayed = false;
			// очищуємо значення в рядку
			input.innerHTML = '';
			// і вставляємо введене число
			input.innerHTML += event.target.innerHTML;
		}
	})
}

// функція для очищення
clear.addEventListener('click', function(){
	// очищуємо значення в рядку
	input.innerHTML = '';
})

// функція для отримання результату введеної операції
result.addEventListener('click', function(){
	// отримуємо доступ до введеної операції
	const inputString = input.innerHTML;

	/// отримуємо доступ до останнього введеного значення в операції
	const lastChar = inputString[inputString.length - 1];
	// якщо юзер останнім символом ввів оператор і натискає на отримання результату
	if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷' || lastChar === '.') {
		// нічого не робимо
		return null;
	}

	// отримуємо масив всіх введених чисел
	const numbers = inputString.split(/\+|\-|\×|\÷/g);

	// отримуємо масив всіх введених операторів (їх завжди менше на один ніж введених чисел)
	const operators = inputString.replace(/[0-9]|\./g, '').split('');

	// проведемо всі операції ділення для введеної операції
	let divide = operators.indexOf('÷');
	while (divide !== -1) {
		numbers.splice(divide, 2, numbers[divide] / numbers[divide+1]);
		operators.splice(divide, 1);
		divide = operators.indexOf('÷');
	}

	// проведемо всі операції множення для введеної операції
	// знаходимо перший оператор множення серед всіх операторів
	let multiply = operators.indexOf('×');
	// доки оператор множення є у масиві операторів
	while (multiply !== -1) {
		// знаходимо у масиві значення чисел які знаходяться навколо цього оператора
		// і замінюємо їх на результат їх перемноження
		numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply+1]);
		// видаляємо цей оператор множення з масиву операторів
		operators.splice(multiply, 1);
		// знаходимо наступний оператор множення серед всіх операторів
		multiply = operators.indexOf('×');
	}

	// проведемо всі операції віднімання для введеної операції
	let substract = operators.indexOf('-');
	while (substract !== -1) {
		numbers.splice(substract, 2, numbers[substract] - numbers[substract+1]);
		operators.splice(substract, 1);
		substract = operators.indexOf('-');
	}

	// проведемо всі операції додавання для введеної операції
	let add = operators.indexOf('+');
	while (add !== -1) {
		numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add+1]));
		operators.splice(add, 1);
		add = operators.indexOf('+');
	}

	// замінюємо значення введеної операції на її результат
	input.innerHTML = numbers[0];
	// ставимо позначку що це вже результат попередньої введеної операції
	resultDisplayed = true;
})