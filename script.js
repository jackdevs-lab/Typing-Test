const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "The quick brown fox jumps over the lazy dog and runs across the field",
  "I meticulously organized my bookshelf to accommodate all the new novels I bought.  ",
  "The picturesque landscape was bathed in the soft glow of the setting sun.  ",
  "She swiftly navigated through the crowded marketplace with remarkable agility",
  "The professor elaborated on the intricate details of quantum mechanics.",
  "I need to finalize the report before the deadline approaches next week.",
  "The aroma of freshly baked bread wafted through the cozy kitchen.",
  "He carefully deciphered the ancient manuscript, revealing its hidden secrets",
  "The meeting was rescheduled due to unforeseen circumstances.",
  "The children eagerly awaited the arrival of their grandparents for the holidays.",
  "I adjusted the thermostat to maintain a comfortable temperature throughout the day.",
  "The architect presented a comprehensive plan for the new city park.",
  "She encountered several challenges while learning the new programming language.",
  "The surgeon performed the complex operation with extraordinary precision",
  "The artist skillfully blended colors to create a stunning masterpiece.",
  "The engineer designed an innovative solution to the persistent problem",
  "She gracefully accepted the award on behalf of her entire team.",
  "The journalist meticulously fact-checked the article before publication.",
  "The athlete trained rigorously to prepare for the upcoming competition.",
  "The software update included several important security enhancements.",
];

let randomWord;
let score = 0;
let time = 100;
// let difficulty = "medium";
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreElement.innerText = score;
}

function updateTime() {
  time--;
  timeElement.innerText = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameElement.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="history.go(0)">Play Again</button>
    `;
  endgameElement.style.display = "flex";
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    e.target.value = "";
    addWordToDom();
    updateScore();
    if (difficulty === "hard") time += 2;
    else if (difficulty === "medium") time += 3;
    else time += 5;
    updateTime();
  }
});

settingsButton.addEventListener("click", () =>
  settings.classList.toggle("hide")
);
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

// Init
difficultySelect.value = difficulty;
addWordToDom();
text.focus();
