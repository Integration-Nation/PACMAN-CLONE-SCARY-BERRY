import Queue from "./priorityQueue.js";

const start = { row: 0, col: 0 };
const end = { row: 9, col: 9 };

export function aStar(start, goal, getNeighbours) {
  function heuristic(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  }

  let priorityQueue = new Queue();
  priorityQueue.enqueue(start, heuristic(start, goal));

  let gScore = new Map();
  gScore.set(start, 0);

  let fScore = new Map();
  fScore.set(start, heuristic(start, goal));

  let cameFrom = new Map();

  while (!priorityQueue.isEmpty()) {
    let current = priorityQueue.front();
    priorityQueue.dequeue();

    if (current.row === goal.row && current.col === goal.col) {
      return reconstructPath(cameFrom, current);
    }

    for (const neighbour of getNeighbours(current)) {
      const tentativeGScore = gScore.get(current) + 1;

      const neighbourKey = `${neighbour.row},${neighbour.col}`;
      console.log(getNeighbours(current)); //HER

      if (!gScore.has(neighbourKey) || tentativeGScore < gScore.get(neighbourKey)) {
        cameFrom.set(neighbourKey, current);
        gScore.set(neighbourKey, tentativeGScore);
        const tentativeFScore = tentativeGScore + heuristic(neighbour, goal);
        fScore.set(neighbourKey, tentativeFScore);

        if (!priorityQueue.includes(neighbour)) {
          priorityQueue.enqueue(neighbour, tentativeFScore);
        } else {
          priorityQueue.update(neighbour, tentativeFScore);
        }
      }
    }
    return null;
  }

  function reconstructPath(cameFrom, current) {
    console.log(cameFrom);

    const path = [];
    let key = `${current.row},${current.col}`;
    while (cameFrom.has(key)) {
      path.unshift(current);
      current = cameFrom.get(key);
      key = `${current.row},${current.col}`;
    }
    path.unshift(current);
    return path;
  }
}
