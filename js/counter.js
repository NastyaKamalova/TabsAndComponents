const counter = document.querySelector(".counter");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");


let stateCounter = {
	number : 0,
	color : "white"
}

const setStateCounter = function(nextStateCounter) {
	renderCounter(nextStateCounter);
	stateCounter = nextStateCounter;
}

const setNumber = function(number) {
	setStateCounter({...stateCounter, number});
}

const setColor = function(color) {
	setStateCounter({...stateCounter, color});
}


const renderCounter = function(stateComponent) {
	if (stateComponent.number !== stateCounter.number) {
		counter.value = stateComponent.number;
	}
	if(stateComponent.color != stateCounter.color) {
		counter.color = stateComponent.color;
	}
}

const clearInput = function() {
	let clearValue = '';
	for (let i = 0; i < counter.value.length; i++) {
		if (!isNaN(Number(counter.value[i]))) {
			clearValue += counter.value[i];
		}
	}
	counter.value = clearValue;
	return clearValue;
}


const counterHandler = function(e) {
	setNumber(clearInput());
}


counter.addEventListener("input", counterHandler);
plus.addEventListener("click", () => setNumber(Number(counter.value) + 1));
minus.addEventListener("click", () => setNumber(Number(counter.value) - 1));