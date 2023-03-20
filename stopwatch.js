let timerID;
const timer = document.getElementById("timer");
let lastTimerStartTime = 0;
let msElapsedbeforeLastStart = 0;

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

function startTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;

  lastTimerStartTime = Date.now();
  // we don't know how often we want the UI to update => we use RequestAnimationFrame
  timerID = requestAnimationFrame(updateTimer);
}

function stopTimer() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;

  msElapsedbeforeLastStart += Date.now() - lastTimerStartTime;

  cancelAnimationFrame(timerID);
}

function resetTimer() {
  // start and stop remain enabled
  resetButton.disabled = true;
  timer.textContent = "00:00:000";

  msElapsedbeforeLastStart = 0;
}

function updateTimer() {
  // how much time has gone by?
  //miliseconds
  const msElapsed = Date.now() - lastTimerStartTime + msElapsedbeforeLastStart;
  //seconds
  const sElapsed = msElapsed / 1000;
  //minutes
  const minElapsed = sElapsed / 60;

  const msText = formatNumber(msElapsed % 1000, 3);
  const sText = formatNumber(Math.floor(sElapsed) % 60, 2);
  const minText = formatNumber(Math.floor(minElapsed), 2);

  timer.textContent = `${minText}:${sText}:${msText}`;

  timerID = requestAnimationFrame(updateTimer);
}

function formatNumber(number, desiredLength) {
  const stringNumber = String(number);

  if (stringNumber.length > desiredLength) {
    return stringNumber.slice(0, desiredLength);
  }

  return stringNumber.padStart(desiredLength, "0");
}
