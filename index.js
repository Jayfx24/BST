class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

export class Tree {
  constructor(arr) {
    this.root = this.buildTree(this.#sortArr(arr));
  }

  buildTree(arr) {
    if (arr.length === 0) return null;
    let mid = Math.floor(arr.length / 2);
    let root = new Node(arr[mid]);
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));
    return root;
  }

  insert(value) {
    const newNode = new Node(value);
    let temp = this.root;
    while (temp !== null) {
      if (newNode.data === temp.data) return;
      if (newNode.data < temp.data) {
        if (temp.left === null) {
          temp.left = newNode;
          // console.log(temp);
          return;
        }
        temp = temp.left;
      } else {
        if (temp.right === null) {
          temp.right = newNode;
          return;
        }
        temp = temp.right;
      }
    }

    return temp;
  }

  deleteItem(value, temp = this.root) {
    if (temp == null) {
      return null;
    }
    if (value < temp.data) {
      // console.log(`pointer not found ${temp ? temp.data : null}`);
      temp.left = this.deleteItem(value, temp.left);
    } else if (value > temp.data) {
      // console.log(`pointer not found ${temp ? temp.data : null}`);
      temp.right = this.deleteItem(value, temp.right);
    } else if (temp.data === value) {
      // console.log(`pointer found ${temp ? temp.data : null}`);
      // if leaf
      if (temp.right == null && temp.left == null) {
        return null;
      }
      // if with two child
      else if (temp.right && temp.left) {
        let successor = temp.right;

        while (successor.left !== null) {
          successor = successor.left;
        }
        temp.data = successor.data;
        // delete successor from
        temp.right = this.deleteItem(successor.data, temp.right);
      }
      // if with a single child;
      else if (temp.left && temp.right == null) {
        return (temp = temp.left);
      } else {
        return (temp = temp.right);
      }
    }
    return temp;
  }
  //
  // console.log(`Can be placed if leaf${temp ? temp.data : null}`);

  find(value) {
    let temp = this.root;
    while (temp !== null) {
      if (value === temp.data) {
        return temp;
      } else if (value > temp.data) {
        temp = temp.right;
      } else {
        temp = temp.left;
      }
    }
    return null;
  }

  levelOrderIter(callback) {
    //first in first out
    if (!callback) throw new Error("A callback is needed");
    const queue = [this.root];
    while (queue.length > 0) {
      let temp = queue[0];
      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);
      callback(temp);
      // console.table(queue)
      queue.shift();
    }
  }

  levelOrderRecur(callback, queue = [this.root]) {
    if (!callback) throw new Error("A callback is needed");
    if (queue.length === 0) return;
    let temp = queue.shift();
    if (temp.left) queue.push(temp.left);
    if (temp.right) queue.push(temp.right);
    callback(temp);
    return this.levelOrderRecur(callback, queue);
  }
  inOrder(callback, temp = this.root) {
    if (!callback) throw new Error("A callback is needed");
    if (temp == null) return;

    if (temp.left) this.inOrder(callback, temp.left);
    callback(temp);
    if (temp.right) this.inOrder(callback, temp.right);
  }

  preOrder(callback, temp = this.root) {
    if (!callback) throw new Error("A callback is needed");
    if (temp == null) return;
    callback(temp);
    if (temp.left) this.preOrder(callback, temp.left);
    if (temp.right) this.preOrder(callback, temp.right);
  }

  postOrder(callback, temp = this.root) {
    if (!callback) throw new Error("A callback is needed");
    if (temp == null) return;
    if (temp.left) this.postOrder(callback, temp.left);
    if (temp.right) this.postOrder(callback, temp.right);
    callback(temp);
  }

  height(value) {
    let node = this.find(value);
    if (node == null) return null;
    return this._findHeight(node);
  }

  _findHeight(node) {
    if (node == null) return -1;

    let leftHeight = this._findHeight(node.left);
    let rightHeight = this._findHeight(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(value, temp = this.root, steps = 0) {
    if (temp == null) return -1;

    if (value < temp.data) return this.depth(value, temp.left, steps + 1);
    else if (value > temp.data) return this.depth(value, temp.right, steps + 1);
    else return steps;
  }

  isBalanced(node = this.root) {
    if (node == null) return true;

    let leftHeight = this._findHeight(node.left);
    let rightHeight = this._findHeight(node.right);

    let leftNode = this.isBalanced(node.left);
    let rightNode = this.isBalanced(node.right);

    if (!leftNode || !rightNode) return false;

    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    else return true;
  }

  reBalance() {
    if (this.isBalanced()) return true;
    const newArr = [];
    const append = (value) => {newArr.push(value.data)};

    this.inOrder(append);
    this.root = this.buildTree(newArr);
    
    prettyPrint(this.root)

  }

  #sortArr(arr) {
    return [...new Set(arr.sort((a, b) => a - b))];
  }
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

