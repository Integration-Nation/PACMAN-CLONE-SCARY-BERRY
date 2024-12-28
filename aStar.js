import Queue from "./priorityQueue.js";

const start = { x: 0, y: 0 };
const end = { x: 9, y: 9 };

function aStar(start, end, neighbours) {
  function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  let priorityQueue = Queue();
  priorityQueue.enqueue(start, heuristic(start, goal));

  let gScore = new Map();
  gScore.set(start, 0);

  let fScore = new Map();
  fScore.set(start, heuristic(start, goal));

  while (!priorityQueue.isEmpty()) {
    let current = priorityQueue.front();
    priorityQueue.dequeue();
  }

  for (const neighbour of neighbours(current)) {
    const tentativeGScore = gScore.get(current) + 1;

    if (!gScore.has(neighbour) || tentativeGScore < gScore.get(neighbour)) {
      gScore.set(neighbour, tentativeGScore);
      const tentativeFScore = tentativeGScore + heuristic(neighbour, goal);
      fScore.set(neighbour, tentativeFScore);

      if (!priorityQueue.includes(neighbour)) {
        priorityQueue.enqueue(neighbour, tentativeFScore);
      } else {
        priorityQueue.update(neighbour, tentativeFScore);
      }
    }
  }
  return null;
}
