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
  includes(element) {
    return this.items.includes(element);
  }

  update(element, newPriority) {
    // Find elementets index
    const index = this.items.findIndex((item) => item.element.row === element.row && item.element.col === element.col);

    if (index !== -1) {
      // Fjern elementet
      this.items.splice(index, 1);
      // Genindsæt det med ny prioritet
      this.enqueue(element, newPriority);
    }
  }

  // tilføjer et element til slutningen af listen
  enqueue(element, priority) {
    let queueElement = new QueueElement(element, priority);
    let contain = false;
    for (let i = 0; i < this.items.length; i++) {
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
      str += `element: ${this.items[i].element.x}, ${this.items[i].element.y} priority: ${this.items[i].priority}  `;
    }
    console.log(str);
  }
}
