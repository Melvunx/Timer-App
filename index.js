const choice = document.getElementById("choice");
const countdown = document.getElementById("countdownDisplay");
const state = document.getElementById("stateTime");
const start = document.getElementById("start");
const clear = document.getElementById("clear");
const stop = document.getElementById("stop");
const buttons = document.querySelectorAll("button");

let totalSeconds = 0;
let interval = null;
let isPause = false;

//fonction pour afficher le compte à rebour
const updateDisplay = (minutes, seconds) => {
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  countdown.innerHTML = `<h1>${minutes} : ${seconds}</h1>`;

  if (totalSeconds <= 60) {
    state.innerHTML = `
    <h1 class="timerState">Il reste moins d'une minute !</h1>
    `;
  } else {
    state.innerHTML = "";
  }
};

//Calcule le nombre total de secondes
const minuteur = () => {
  totalSeconds = Number(choice.value) * 60;
};

const endTimer = () => {
  clearInterval(interval);
  start.disabled = false;
  buttons.forEach((button) => (button.disabled = true));
  state.innerHTML = `<h1 class="timerState">Temps écoulé !</h1>`;
};

const timer = () => {
  if (!isPause && totalSeconds > 0) {
    countdown.style.opacity = 1;
    console.log(totalSeconds);
    totalSeconds--;

    start.disabled = true;

    buttons.forEach((button) => {
      button.disabled = false;
    });

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // console.log(typeof minutes, typeof seconds);

    updateDisplay(minutes, seconds);
  } else {
    //Minuteur est fini
    endTimer();
    console.log("Temps écoulé");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  minuteur();

  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  updateDisplay(minutes, seconds);
});

start.addEventListener("click", () => {
  minuteur();
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(timer, 1000);
});

choice.addEventListener("input", (e) => {
  let maxTime = 99;
  if (e.target.value !== 0 && e.target.value <= maxTime) {
    choice.style.background = "lightgreen";
    start.disabled = false;
  } else {
    choice.style.background = "orangered";
    start.disabled = true;
  }
  //Permet a l'input de redevenir à sa couleur d'origine
  choice.addEventListener("blur", () => {
    choice.style.background = "white";
  });
});

clear.addEventListener("click", () => {
  if (window.confirm("Your really want to reset the timer ?")) {
    endTimer();
    updateDisplay(0, 0);
  }
});

stop.addEventListener("click", () => {
  if (!isPause) {
    //isPause = false
    clearInterval(interval);
    stop.textContent = "Resume";
    console.log("Pause");
  } else {
    //isPause = true
    interval = setInterval(timer, 1000);
    stop.textContent = "Pause";
    console.log("Go");
  }
  //Permet au timer de reprendre
  isPause = !isPause;
});
