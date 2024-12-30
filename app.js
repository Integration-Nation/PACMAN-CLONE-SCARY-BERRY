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
  tick();
  //setInterval(tick, 1000);
}

//* Controller *//
function tick() {
  if (!playerPosition || !enemyPosition) return;

  const path = aStar(enemyPosition, playerPosition, (current) => grid.neighbours(current));

  console.log(path);

  if (path && path.length > 1) {
    const nextStep = path[1]; // Spring første trin over, da det er nuværende position
    grid.set({ row: enemyPosition.row, col: enemyPosition.col, value: 0 }); // Ryd gammel position
    grid.set({ row: nextStep.row, col: nextStep.col, value: 2 }); // Indstil ny position
    enemyPosition = { row: nextStep.row, col: nextStep.col }; // Opdater global position
  }

  displayBoard();
}

//* Model

const grid = new Grid(21, 21);

let playerPosition = { row: 15, col: 10 };

let enemyPosition = { row: 10, col: 9 };

function spawnPlayer() {
  grid.set({ row: playerPosition.row, col: playerPosition.col, value: 3 });
}

function spawnEnemy() {
  grid.set({ row: enemyPosition.row, col: enemyPosition.col, value: 2 });
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
          cells[index].classList.add("wall");
          break;
        case 1:
          cells[index].classList.remove("wall");
          break;
        case 2:
          cells[index].classList.add("enemy");
          break;
        case 3:
          cells[index].classList.add("player");
          break;
      }
    }
  }
}
