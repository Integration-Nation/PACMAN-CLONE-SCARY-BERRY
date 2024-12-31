import Queue from "./priorityQueue.js";

const start = { row: 0, col: 0 };
const end = { row: 9, col: 9 };

export function aStar(start, goal, getNeighbours, getValue) {
  function heuristic(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  }

  let priorityQueue = new Queue();
  priorityQueue.enqueue(start, heuristic(start, goal));

  let gScore = new Map();
  gScore.set(`${start.row},${start.col}`, 0);

  let fScore = new Map();
  fScore.set(`${start.row},${start.col}`, heuristic(start, goal));

  let cameFrom = new Map();

  while (!priorityQueue.isEmpty()) {
    let current = priorityQueue.front();
    priorityQueue.dequeue();

    if (current.element.row === goal.row && current.element.col === goal.col) {
      return reconstructPath(cameFrom, current);
    }

    for (const neighbour of getNeighbours(current.element)) {
      console.log(getValue(neighbour));

      if (getValue(neighbour) === 0 || getValue(neighbour) === undefined) {
        continue;
      }

      const tentativeGScore = gScore.get(`${current.element.row},${current.element.col}`) + 1;

      const neighbourKey = `${neighbour.row},${neighbour.col}`;

      if (!gScore.has(neighbourKey) || tentativeGScore < gScore.get(neighbourKey)) {
        cameFrom.set(neighbourKey, current.element);
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
  }
  return null;

  function reconstructPath(cameFrom, current) {
    const path = [];
    let key = `${current.element.row},${current.element.col}`;
    while (cameFrom.has(key)) {
      path.unshift(current.element);
      current.element = cameFrom.get(key);
      key = `${current.element.row},${current.element.col}`;
    }

    path.unshift(current.element);
    return path;
  }
}
