"use strict";

import Queue from "./priorityQueue.js";
import Grid from "./grid.js";
import { wallList } from "./wall.js";

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
  displayBoard();
}

//* Controller

//* Model

const grid = new Grid(21, 21);

const priorityQueue = new Queue();

function spawnPlayer() {
  grid.set({ row: 15, col: 10, value: 3 });
}

function spawnEnemy() {
  grid.set({ row: 10, col: 9, value: 2 });
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
          console.log(grid.get({ row, col }));
          cells[index].classList.add("wall");
          break;
        case 1: // Note: doesn't remove goal if previously set
          console.log(grid.get({ row, col }));
          cells[index].classList.remove("wall");
          console.log("wall");
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
