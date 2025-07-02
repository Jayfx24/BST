import { Tree,prettyPrint } from "./index.js";
// Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
// Confirm that the tree is balanced by calling isBalanced.
// Print out all elements in level, pre, post, and in order.
// Unbalance the tree by adding several numbers > 100.
// Confirm that the tree is unbalanced by calling isBalanced.
// Balance the tree by calling rebalance.
// Confirm that the tree is balanced by calling isBalanced.
// Print out all elements in level, pre, post, and in order.
const randomNumber = (max) => Math.floor(Math.random() * max);

function getRandArr() {
  const arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(randomNumber(100));
  }
  return arr;
}
const newArr = getRandArr();
console.log(newArr);

const tree = new Tree(newArr);
prettyPrint(tree.root)
// console.log(tree.isBalanced())
// tree.levelOrderRecur(console.log)
// tree.preOrder(console.log)
// tree.postOrder(console.log)
// tree.inOrder(console.log)
// tree.insert(200);
// tree.insert(20);
// tree.insert(210);
// tree.insert(2);
// tree.insert(3);
// tree.insert(121);
// prettyPrint(tree.root)
// tree.reBalance()
// console.log(tree.isBalanced())
// prettyPrint(tree.root)
