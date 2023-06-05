const timerDisplay = document.querySelector('.timer__display');
const timerPlay = document.querySelector('.timer__play');
const timerPause = document.querySelector('.timer__pause');
const timerReset = document.querySelector('.timer__reset');
const timerStop = document.querySelector('.timer__stop');
const timerDelay = document.querySelector('.timer__delay');
const timerReverse = document.querySelector('.timer__reverse');

let timer;

let reverse = true;

let delay = Number(timerDelay.value);

function goTimer(value) {
	clearTimeout(timer);
  if (value === 'stop' || value === 'reset') {
  	timerDisplay.innerHTML = 0;
  }
  if (value === 'play') {
    timer = setTimeout(function go() {
    if(reverse) timerDisplay.innerHTML++
    else timerDisplay.innerHTML--  
      timer = setTimeout(go, delay);
    }, delay);
  }

}

timerPlay.addEventListener('click', function() {
	goTimer('play');
});

timerPause.addEventListener('click', function() {
	goTimer();
});

timerReset.addEventListener('click', function() {
	goTimer('reset');
});

timerStop.addEventListener('click', function() {
	goTimer('stop');
});

timerReverse.addEventListener('click', function() {
  reverse = !reverse
});


timerDelay.addEventListener('change', function(event) {
  if (!isNaN(Number(event.target.value))) {
    delay = Number(event.target.value);
  } else {
    delay = 1000;
    timerDelay.value = 1000;
  }
});
