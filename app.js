"use strict";

import Grid from "./grid.js";
import { wallList } from "./wall.js";
import { aStar } from "./aStar.js";

window.addEventListener("load", start);

const grid = new Grid(23, 23);

let playerPosition = { row: 16, col: 11 };

let enemyPosition = { row: 10, col: 10 };
let enemyPosition2 = { row: 12, col: 12 };

let direction = "right";
let oldDirection = "right";

let tickCount = 0;

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

  movePlayer();
  moveEnemy();
  displayBoard();

  tickCount++;
  console.log("tickCount", tickCount);

  await sleep(200);
  tick();

  console.log(path);
}

function moveEnemy() {
  const path = aStar(
    enemyPosition,
    playerPosition,
    (current) => grid.neighbours(current),
    (neighbour) => grid.get(neighbour)
  );
  if (path && path.length > 1) {
    const nextStep = path[1];

    grid.set({ row: enemyPosition.row, col: enemyPosition.col, value: 1 }); //
    grid.set({ row: nextStep.row, col: nextStep.col, value: 2 });
    enemyPosition = { row: nextStep.row, col: nextStep.col };
  }
  if (tickCount > 10) {
    const path2 = aStar(
      enemyPosition2,
      playerPosition,
      (current) => grid.neighbours(current),
      (neighbour) => grid.get(neighbour)
    );
    if (path2 && path2.length > 1) {
      const nextStep = path2[1];

      grid.set({ row: enemyPosition2.row, col: enemyPosition2.col, value: 1 }); //
      grid.set({ row: nextStep.row, col: nextStep.col, value: 2 });
      enemyPosition2 = { row: nextStep.row, col: nextStep.col };
    }
  }

  displayBoard();
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
    direction = oldDirection;

    return;
  }

  grid.set({ row: oldPosition.row, col: oldPosition.col, value: 1 });
  grid.set({ row: newPlayerPosition.row, col: newPlayerPosition.col, value: 3 });
  playerPosition = { row: newPlayerPosition.row, col: newPlayerPosition.col };
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

//* Model
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

      cells[index].classList.toggle("wall", value === 0);
      cells[index].classList.toggle("path", value === 1);

      const character = document.querySelector("#character");
      const enemy1 = document.querySelector("#enemy1");
      const enemy2 = document.querySelector("#enemy2");

      // Update positions
      if (character) {
        character.style.transform = `translate(${playerPosition.col * cellSize}px, ${playerPosition.row * cellSize}px)`;
      }

      if (enemy1) {
        enemy1.style.transform = `translate(${enemyPosition.col * cellSize}px, ${enemyPosition.row * cellSize}px)`;
      }

      if (enemy2 && tickCount > 10) {
        enemy2.style.transform = `translate(${enemyPosition2.col * cellSize}px, ${enemyPosition2.row * cellSize}px)`;
      }
    }
  }
}
