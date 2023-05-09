const initinalData = [
	{
		id: 1,
		question: 'JavaScript это Java?',
		answers: [
			{text: 'Нет', correct: true},
			{text: 'Да', correct: false},
			{text: 'Возможно', correct: false}
		]
	},
	{
		id: 2,
		question: 'Сколько параментров можно передать в фукнцию?',
		answers: [
			{text: 'Сколько указано при ее создании', correct: true},
			{text: 'Минимум один', correct: false},
			{text: 'Сколько угодно', correct: false}
		]
	},
	{
		id: 3,
		question: 'Массивы это объекты?',
		answers: [
			{text: 'Не совсем', correct: false},
			{text: 'Нет', correct: false},
			{text: 'Да, это спископодобные объекты', correct: true}
		]
	}
];

const acc = [];

const box = document.querySelector('.box'),
	  question = box.querySelector('.question'),
	  labels = box.querySelectorAll('.form-check-label'),
	  inputs = box.querySelectorAll('input'),
	  checkBtn = box.querySelector('button'),
	  surveyResult = document.querySelector('.survey-result');

function fillData(data) {
	box.dataset.id = data.id;
	question.textContent = data.question;
	labels.forEach((label, index) => label.textContent = data.answers[index].text);
	inputs.forEach((input, index) => input.dataset.correct = data.answers[index].correct);
}

fillData(initinalData[0]);



box.addEventListener('click', clickBox)

function clickBox(event){
	let isTargetInput = event.target.classList.contains('answer-button') || event.target.classList.contains('label');
	if (isTargetInput) checkBtn.removeAttribute('disabled');

	let isTargetButton = event.target.classList.contains('btn') && !checkBtn.disabled;

	if (isTargetButton) {
		if (box.dataset.id < initinalData.length) {
			answerStep();		
		} else {
			finalStep();
		}	
	}
}


function answerStep() { 
	inputs.forEach(input => {
		if (input.checked) {
			acc.push(input.dataset.correct);
			fillData(initinalData[box.dataset.id]);
			input.checked = false;
			checkBtn.disabled = true;
		}
	})
}

function finalStep() {
	inputs.forEach(input => {
		if (input.checked) acc.push(input.dataset.correct);
	})
	box.classList.add('d-none');

	let counter = 0;
	acc.forEach(answer => answer == 'true' ? counter++ : undefined)
	surveyResult.textContent = `У вас ${counter} правильных ответов из ${initinalData.length}`;
}