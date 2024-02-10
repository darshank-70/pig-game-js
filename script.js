let p1Dom = document.querySelector(".player-1-current");
let p2Dom = document.querySelector(".player-2-current");
let rollDiceBtn = document.querySelector(".roll-dice");
let holdDiceBtn = document.querySelector(".hold-dice");
let diceValue = document.querySelector(".dice-output");
let p1Container = document.querySelector(".container .player-1");
let p2Container = document.querySelector(".container .player-2");
let nameButton = document.querySelector(".change-names");
let submitBtn = document.querySelector(".submit");
let modal = document.querySelector("#input-modal");
let p1Input = "player 1";
let p2Input = "player 2";
let update = document.querySelector("h1");
let foulAudio = new Audio("audio1.wav");
let player1Score;
let player2Score;
let currentPlayer = 1;
let currentValue;
update.textContent = "current Player is " + currentPlayer;

function init() {
  player1Score = 0;
  player2Score = 0;
}

init();

rollDiceBtn.addEventListener("click", (e) => {
  rollDice();
});

holdDiceBtn.addEventListener("click", (e) => {
  addScore();
});
nameButton.addEventListener("click", (e) => {
  modal.showModal();
});
submitBtn.addEventListener("click", setNames);

function player1Turn(value) {
  player1Score += value;
  updateDom();
}

function player2Turn(value) {
  player2Score += value;
  updateDom();
}
function updateDom() {
  p1Dom.textContent = `${player1Score}`;
  p2Dom.textContent = `${player2Score}`;
  if (currentPlayer == 1) {
    update.textContent = "current Player is " + p1Input;

    p1Container.classList.add("active");
    p2Container.classList.remove("active");
  } else {
    update.textContent = "current Player is " + p2Input;

    p1Container.classList.remove("active");
    p2Container.classList.add("active");
  }
}
function rollDice() {
  update.textContent = "current Player is " + currentPlayer;

  currentValue = parseInt(Math.random() * 10) % 7;
  diceValue.textContent = currentValue;
  if (currentValue == 0 && currentPlayer == 1) {
    foulAudio.play();
    currentPlayer = 2;
    player1Score = 0;

    //updateDom();
  } else if (currentValue == 0 && currentPlayer == 2) {
    foulAudio.play();
    player2Score = 0;
    currentPlayer = 1;
    // /updateDom();
  }
  updateDom();
}
function addScore() {
  if (currentPlayer == 1) {
    if (currentValue != 0) {
      player1Turn(currentValue);
    }
  } else if (currentPlayer == 2) {
    if (currentValue != 0) {
      player2Turn(currentValue);
    }
  }
  currentPlayer = currentPlayer == 1 ? 2 : 1;
  updateDom();
}

function setNames() {
  let p1Dom = document.querySelector("#person-1");
  let p2Dom = document.querySelector("#person-2");
  p1Input = document.querySelector("#input-p-1").value;
  p2Input = document.querySelector("#input-p-2").value;
  updateDom();
  p1Dom.textContent = p1Input;
  p2Dom.textContent = p2Input;
  modal.close();
}
