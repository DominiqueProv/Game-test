'use strict';

let userScore = 0;
let botScore = 0;
let isRandom = true;
let winner;
let botSelection;
let userSelection;
const event = document.getElementById('event');
const result = document.getElementById('result');
const robotName = document.getElementById('robot');

const play = (pick) => {
  if (!isRandom) {
    let pickArr = getFromLocalStorage('pick') || [];
    if (pickArr.length === 0) {
      botSelection = Math.floor(Math.random() * 3 + 1);
      if (botSelection == 1) {
        botSelection = 'Rock';
        pickArr.push(botSelection);
        saveToLocalStorage('pick', pickArr);
      } else if (botSelection == 2) {
        botSelection = 'Paper';
        pickArr.push(botSelection);
        saveToLocalStorage('pick', pickArr);
      } else {
        botSelection = 'Scissor';
        pickArr.push(botSelection);
        saveToLocalStorage('pick', pickArr);
      }
    } else if (pickArr.length === 1) {
      if (pickArr[0] == 'Rock') {
        botSelection = 'Paper';
        pickArr.push(botSelection);
        pickArr.splice(0, 1);
        saveToLocalStorage('pick', pickArr);
      } else if (pickArr[0] == 'Paper') {
        botSelection = 'Scissor';
        pickArr.push(botSelection);
        pickArr.splice(0, 1);
        saveToLocalStorage('pick', pickArr);
      } else if (pickArr[0] == 'Scissor') {
        botSelection = 'Rock';
        pickArr.push(botSelection);
        pickArr.splice(0, 1);
        saveToLocalStorage('pick', pickArr);
      }
    }
  } else {
    botSelection = Math.floor(Math.random() * 3 + 1);
    if (botSelection === 1) {
      botSelection = 'Rock';
    } else if (botSelection === 2) {
      botSelection = 'Paper';
    } else {
      botSelection = 'Scissor';
    }
  }

  userSelection = pick.id;

  let userWins = `The opponent has chosen<br/><h3>${botSelection}</h3><span> 🔥 You WIN this round 🔥</span>`;
  let botWins = `The opponent has chosen <br/><h3>${botSelection}</h3><span> 😭 You LOSE this round 😭</span>`;
  let draw = `Both players have chosen <br/><h3>${botSelection}</h3><span> 😶 It's a DRAW 😶</span>`;
  if (botSelection === 'Rock') {
    if (userSelection === 'paper') {
      winner = userWins;
    } else if (userSelection === 'rock') {
      winner = draw;
    } else {
      winner = botWins;
    }
  } else if (botSelection === 'Paper') {
    if (userSelection === 'scissor') {
      winner = userWins;
    } else if (userSelection === 'paper') {
      winner = draw;
    } else {
      winner = botWins;
    }
  } else if (botSelection === 'Scissor') {
    if (userSelection === 'rock') {
      winner = userWins;
    } else if (userSelection === 'scissor') {
      winner = draw;
    } else {
      winner = botWins;
    }
  }
  if (winner === userWins) {
    event.style.color = 'gold';
    pick.style.background = 'gold';
    event.innerHTML = winner;
    event.style.border = '1px solid #fff';
    event.style.borderRadius = '6px';
    setTimeout(() => {
      pick.style.background = '';
    }, 1200);
  } else if (winner === botWins) {
    event.style.color = 'red';
    pick.style.background = 'red';
    event.innerHTML = winner;
    event.style.border = '1px solid #fff';
    event.style.borderRadius = '6px';
    setTimeout(() => {
      pick.style.background = '';
    }, 1200);
  } else if (winner === draw) {
    event.style.color = 'black';
    pick.style.background = 'black';
    event.innerHTML = winner;
    event.style.border = '1px solid #fff';
    event.style.borderRadius = '6px';
    setTimeout(() => {
      pick.style.background = '';
    }, 1200);
  }
  points(winner, userWins, botWins);
};

const points = (winner, userWins, botWins) => {
  let roundWon = document.getElementsByClassName('fa-heart');
  if (winner === userWins) {
    roundWon[botScore++ + 3].style.color = 'black';
  } else if (winner === botWins) {
    roundWon[userScore++].style.color = 'black';
  }
  if (botScore === 3 || userScore === 3) {
    if (userScore === 3) {
      result.innerHTML = ' 💩 Sorry, you lose the game 💩';
      setTimeout(() => {
        result.innerHTML = '';
      }, 2000);
    } else {
      result.innerHTML = ' 🏆 Congratulation, you won the game! 🏆';
      setTimeout(() => {
        result.innerHTML = '';
      }, 2000);
    }

    for (let i = 0; i < roundWon.lenght; i++) {
      roundWon[i].style.color = 'rgb(255,0,0)';
      botScore = 0;
      userScore = 0;
    }
  }
};

const switchComputer = () => {
  isRandom = !isRandom;
  if (robotName.innerHTML === 'Random') {
    robotName.innerHTML = 'Tactical';
  } else {
    robotName.innerHTML = 'Random';
  }
};

const saveToLocalStorage = (key, data) => {
  try {
    const stringifyData = JSON.stringify(data);
    localStorage.setItem(key, stringifyData);
  } catch (err) {
    console.error('err in saving data to local storage:', err);
  }
};

const getFromLocalStorage = (key) => {
  try {
    const stringifyData = localStorage.getItem(key);
    if (stringifyData) {
      const jsonData = JSON.parse(stringifyData);
      return jsonData;
    }
    return null;
  } catch (err) {
    return null;
  }
};
