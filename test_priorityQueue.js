let testQueue = new Queue();
const priority = 7;
const element = {
  x: 2,
  y: 3,
};
const priority2 = 9;
const element2 = {
  x: 4,
  y: 5,
};
const priority3 = 12;
const element3 = {
  x: 7,
  y: 8,
};

testQueue.enqueue(element2, priority2);
testQueue.dumpList();

console.log("hej med dig smukke");

testQueue.enqueue(element3, priority3);
testQueue.enqueue(element, priority);

testQueue.dumpList();

console.log("yus er sød :)");
