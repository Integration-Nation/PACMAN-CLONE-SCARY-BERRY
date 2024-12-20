class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

export default class Queue {
  constructor() {
    this.items = [];
  }

  // ========================================
  // metoder der behandler data objekter
  // ========================================

  // tilføjer et element til slutningen af listen
  enqueue(element, priority) {
    let queueElement = new QueueElement(element, priority);
    let contain = false;
    for (let i = 0; i < this.items.length; index++) {
      if (this.items[i].priority > queueElement.priority) {
        this.items.splice(i, 0, queueElement);
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push(queueElement);
    }
  }

  // returnerer elementet på plads nummer index
  get(index) {
    const node = this.nodeAt(index);
    if (node === null) {
      return null;
    }
    return node.data;
  }

  // returnerer det første element i listen
  front() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length == 0;
  }

  // fjerner det første element i listen - og returnerer elementet
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift();
  }

  // ========================================
  // metoder til at operere direkte på nodes
  // ========================================

  // returnerer noden på plads nummer index
  nodeAt(index) {
    let current = this.head;
    let count = 0;
    while (current !== null) {
      if (count === index) {
        return current;
      }
      count++;
      current = current.next;
    }
    return null;
  }

  // ========================================
  // metoder der omhandler hele listen
  // ========================================

  // ========================================
  // Udvikling, testing og debugging
  // ========================================

  // der console.log'er alle data-elementer i listen
  dumpList() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i].element + " ";
      return str;
    }
  }
}
