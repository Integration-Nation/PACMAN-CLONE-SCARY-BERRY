"use strict";

import Grid from "./grid.js";
import { wallList } from "./wall.js";
import { aStar } from "./aStar.js";

window.addEventListener("load", start);

function start() {
  for (const wall of wallList) {
    grid.set({
      row: wall.row,
      col: wall.col,
      value: 1,
    });
  }

  spawnPlayer();
  spawnEnemy();
  generateBoard();
  document.addEventListener("keydown", keyDown);

  tick();
}

//* Controller *//
async function tick() {
  if (!playerPosition || !enemyPosition) return;

  const path = aStar(
    enemyPosition,
    playerPosition,
    (current) => grid.neighbours(current),
    (neighbour) => grid.get(neighbour)
  );

  if (path && path.length > 1) {
    const nextStep = path[1];

    moveEnemy(nextStep);
    movePlayer();
    displayBoard();
  }

  await sleep(400);
  tick();

  console.log(path);
}

function moveEnemy(nextStep) {
  console.log("moveEnemy", nextStep);
  console.log("enemyPosition", enemyPosition);

  grid.set({ row: enemyPosition.row, col: enemyPosition.col, value: 1 }); //
  grid.set({ row: nextStep.row, col: nextStep.col, value: 2 });
  enemyPosition = { row: nextStep.row, col: nextStep.col };
}

function movePlayer() {
  let oldPosition = { row: playerPosition.row, col: playerPosition.col };
  let newPlayerPosition = { row: playerPosition.row, col: playerPosition.col };
  switch (direction) {
    case "left":
      console.log("movePlayer", direction);

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
    return;
  }
  grid.set({ row: oldPosition.row, col: oldPosition.col, value: 1 });
  grid.set({ row: newPlayerPosition.row, col: newPlayerPosition.col, value: 3 });
  playerPosition = { row: newPlayerPosition.row, col: newPlayerPosition.col };
}

function keyDown(event) {
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
//* Model

const grid = new Grid(23, 23);

let playerPosition = { row: 16, col: 11 };

let enemyPosition = { row: 11, col: 10 };

let direction = "right";

function spawnPlayer() {
  grid.set({ row: playerPosition.row, col: playerPosition.col, value: 3 });
}

function spawnEnemy() {
  grid.set({ row: enemyPosition.row, col: enemyPosition.col, value: 2 });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

  board.style.gridTemplateColumns = `repeat(${grid.getCols()}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${grid.getRows()}, 1fr)`;
}

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < grid.getRows(); row++) {
    for (let col = 0; col < grid.getCols(); col++) {
      const index = row * grid.getCols() + col;

      switch (grid.get({ row, col })) {
        case 0:
          cells[index].classList.remove("enemy");
          cells[index].classList.remove("player");
          cells[index].classList.add("wall");

          break;
        case 1:
          cells[index].classList.remove("wall");
          cells[index].classList.remove("enemy");
          cells[index].classList.remove("player");

          break;
        case 2:
          cells[index].classList.remove("wall");
          cells[index].classList.remove("player");
          cells[index].classList.add("enemy");

          break;
        case 3:
          cells[index].classList.remove("enemy");
          cells[index].classList.remove("wall");
          cells[index].classList.add("player");
          break;
      }
    }
  }
}
