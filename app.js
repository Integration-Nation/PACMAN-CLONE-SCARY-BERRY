"use strict";

import Grid from "./grid.js";
import { pathList } from "./path.js";
import { aStar } from "./aStar.js";

window.addEventListener("load", start);

const grid = new Grid(23, 23);

let playerPosition = { row: 16, col: 11 };

let enemyPosition1 = { row: 10, col: 10, valueBeforeStep: 4 };
let enemyPosition2 = { row: 12, col: 12, valueBeforeStep: 4 };
let enemySpeed = 300;

let direction = "right";
let oldDirection = "right";

let tickCount = 0;

let points = 0;

function start() {
  for (const path of pathList) {
    grid.set({
      row: path.row,
      col: path.col,
      value: 4,
    });
  }

  generateBoard();
  document.addEventListener("keydown", keyDown);

  setInterval(() => {
    moveEnemy();
    console.log("enemySpeed i start", enemySpeed);
  }, enemySpeed);
  tick();
}

//* Controller *//
async function tick() {
  if (!playerPosition || !enemyPosition1) return;

  movePlayer();

  displayBoard();

  tickCount++;
  // console.log("tickCount", tickCount);

  await sleep(200);
  tick();
}

function moveEnemy() {
  if (tickCount > 10) {
    const path = aStar(
      enemyPosition1,
      playerPosition,
      (current) => grid.neighbours(current),
      (neighbour) => grid.get(neighbour)
    );
    if (path && path.length > 1) {
      const nextStep = path[1];
      let enemyDirection = calculateEnemyDirection(nextStep, enemyPosition1);

      if (enemyPosition1.valueBeforeStep === 4) {
        grid.set({
          row: enemyPosition1.row,
          col: enemyPosition1.col,
          value: 4,
        });
      } else {
        grid.set({
          row: enemyPosition1.row,
          col: enemyPosition1.col,
          value: 1,
        });
      }
      enemyPosition1 = {
        row: nextStep.row,
        col: nextStep.col,
        valueBeforeStep: grid.get({ row: nextStep.row, col: nextStep.col }),
      };
      grid.set({ row: nextStep.row, col: nextStep.col, value: 2 });
      startPeopleAnimation(enemyDirection, "#enemy1");
    }
  }
  if (points > 2400) {
    const path2 = aStar(
      enemyPosition2,
      playerPosition,
      (current) => grid.neighbours(current),
      (neighbour) => grid.get(neighbour)
    );
    if (path2 && path2.length > 1) {
      const nextStep = path2[1];
      let enemyDirection = calculateEnemyDirection(nextStep, enemyPosition2);
      if (enemyPosition2.valueBeforeStep === 4) {
        grid.set({
          row: enemyPosition2.row,
          col: enemyPosition2.col,
          value: 4,
        });
      } else {
        grid.set({
          row: enemyPosition2.row,
          col: enemyPosition2.col,
          value: 1,
        });
      }
      enemyPosition2 = {
        row: nextStep.row,
        col: nextStep.col,
        valueBeforeStep: grid.get({ row: nextStep.row, col: nextStep.col }),
      };
      grid.set({ row: nextStep.row, col: nextStep.col, value: 2 });

      startPeopleAnimation(enemyDirection, "#enemy2");
    }
  }

  displayBoard();
}

function calculateEnemyDirection(nextStep, enemyPosition) {
  let enemyDirection;
  if (nextStep.row > enemyPosition.row) {
    enemyDirection = "down";
  } else if (nextStep.row < enemyPosition.row) {
    enemyDirection = "up";
  } else if (nextStep.col > enemyPosition.col) {
    enemyDirection = "right";
  } else if (nextStep.col < enemyPosition.col) {
    enemyDirection = "left";
  }
  return enemyDirection;
}

function keyDown(event) {
  oldDirection = direction;
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      direction = "left";
      break;
    case "ArrowRight":
    case "d":
      direction = "right";
      break;
    case "ArrowUp":
    case "w":
      direction = "up";
      break;
    case "ArrowDown":
    case "s":
      direction = "down";
      break;
  }
}

function movePlayer() {
  let oldPosition = { row: playerPosition.row, col: playerPosition.col };
  let newPlayerPosition = { row: playerPosition.row, col: playerPosition.col };

  switch (direction) {
    case "left":
      newPlayerPosition.col--;
      if (newPlayerPosition.col < 0) {
        newPlayerPosition.col = grid.getCols() - 1;
      }
      break;
    case "right":
      newPlayerPosition.col++;
      if (newPlayerPosition.col > grid.getCols() - 1) {
        newPlayerPosition.col = 0;
      }
      break;
    case "down":
      newPlayerPosition.row++;
      if (newPlayerPosition.row > grid.getRows() - 1) {
        newPlayerPosition.row = 0;
      }
      break;
    case "up":
      newPlayerPosition.row--;
      if (newPlayerPosition.row < 0) {
        newPlayerPosition.row = grid.getRows() - 1;
      }
  }

  if (grid.get(newPlayerPosition) === 0) {
    if (direction !== oldDirection) {
      direction = oldDirection;
      movePlayer();
    }

    return;
  }

  if (grid.get(newPlayerPosition) === 4) {
    countPoints();
  }

  grid.set({ row: oldPosition.row, col: oldPosition.col, value: 1 });
  grid.set({
    row: newPlayerPosition.row,
    col: newPlayerPosition.col,
    value: 3,
  });
  playerPosition = { row: newPlayerPosition.row, col: newPlayerPosition.col };

  startBerryAnimation(direction);
}

//* Model

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function countPoints() {
  points += 100;

  if (points == 6000) {
    enemySpeed = 50;
  }
  if (points == 12000) {
    enemySpeed = 200;

    console.log("enemySpeed", enemySpeed);
  }
  if (points == 18000) {
    enemySpeed = 100;
    console.log("enemySpeed", enemySpeed);
  }

  //document.querySelector("#enemy1").style.transition = `transform ${enemySpeed}ms linear`;
  //document.querySelector("#enemy2").style.transition = `transform ${enemySpeed}ms linear`;

  document.querySelector("#score").textContent = points;
}

//* View

function generateBoard() {
  const board = document.querySelector("#grid");

  for (let i = 0; i < grid.getRows() * grid.getCols(); i++) {
    board.insertAdjacentHTML(
      "beforeend",
      /*html*/
      `
        <div class="cell"></div>
        `
    );
  }

  board.insertAdjacentHTML(
    "beforeend",
    `
    <div id="character"></div>
    <div id="enemy1"></div>
    <div id="enemy2"></div>
    `
  );

  board.style.gridTemplateColumns = `repeat(${grid.getCols()}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${grid.getRows()}, 1fr)`;
}

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  const cellSize = cells[0].offsetWidth;

  for (let row = 0; row < grid.getRows(); row++) {
    for (let col = 0; col < grid.getCols(); col++) {
      const index = row * grid.getCols() + col;
      const value = grid.get({ row, col });
      const cell = cells[index];

      cell.classList.toggle("wall", value === 0);
      cell.classList.toggle("path", value === 1);
      cell.classList.toggle("point", value === 4);

      const character = document.querySelector("#character");
      const enemy1 = document.querySelector("#enemy1");
      const enemy2 = document.querySelector("#enemy2");

      // Update positions
      if (character) {
        character.style.transform = `translate(${playerPosition.col * cellSize}px, ${playerPosition.row * cellSize}px)`;
      }

      if (enemy1) {
        enemy1.style.transform = `translate(${enemyPosition1.col * cellSize}px, ${enemyPosition1.row * cellSize}px)`;
      }

      if (enemy2) {
        enemy2.style.transform = `translate(${enemyPosition2.col * cellSize}px, ${enemyPosition2.row * cellSize}px)`;
      }
    }
  }
}

function startPeopleAnimation(direction, enemy) {
  const person = document.querySelector(`${enemy}`);

  person.setAttribute("class", "");

  person.classList.add(`peopleMove${direction}`);
}

function startBerryAnimation(direction) {
  const visualPlayer = document.querySelector("#character");
  visualPlayer.setAttribute("class", "");
  visualPlayer.classList.add(`berryMove${direction}`);
}

function stopMovementAnimation(direction) {
  const visualPlayer = document.querySelector("#character");
  visualPlayer.setAttribute("class", "");
  visualPlayer.classList.add(`playerLook${direction}`);
}
