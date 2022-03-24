// eslint-disable-next-line no-unused-vars,max-classes-per-file
class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

// eslint-disable-next-line no-unused-vars
class List {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const newNode = new Node(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }

  // eslint-disable-next-line consistent-return
  remoteNode(i) {
    if (!this.head) {
      return null;
    }

    let deleteNode = null;

    while (this.head && this.head.i === i) {
      deleteNode = this.head;

      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (currentNode.next.i === i) {
          // eslint-disable-next-line no-unused-vars
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail && this.tail.i === i) {
      this.tail = currentNode;
    }

    return deleteNode;
  }
}

const newList = new List();
newList.add('k=kzkz');
newList.add('k=kzasdasdkz');
newList.add('k=kzaaaakz');
console.log(newList);
