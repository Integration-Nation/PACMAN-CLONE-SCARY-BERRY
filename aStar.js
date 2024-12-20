const start = { x: 0, y: 0 };
const end = { x: 9, y: 9 };

function aStar(start, end, h) {
  let priorityQueue = [];
  let gScore = new Map();
  let fScore = new Map();
  gScore.set(start, 0);
  fScore.set(start, h(start, goal));

  while (priorityQueue.length > 0) {
    let current = Math.min(...priorityQueue);
    priorityQueue.splice(current);
  }
}

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
