/**
 * Traversal callback function.
 * @callback traversalCallback
 * @param {*} nodeValue
 */

import LinkedListNode from "../../../data-structures/linked-list/LinkedListNode";
import LinkedList from "../../../data-structures/linked-list/LinkedList";

/**
 * @param {LinkedListNode} node
 * @param {traversalCallback} callback
 */
function reverseTraversalRecursive<T extends any>(
  node: LinkedListNode<T> | null,
  callback: Function,
) {
  if (node) {
    reverseTraversalRecursive(node.next, callback);
    callback(node.value);
  }
}

/**
 * @param {LinkedList} linkedList
 * @param {traversalCallback} callback
 */
export default function reverseTraversal<T extends any>(
  linkedList: LinkedList<T>,
  callback: Function,
) {
  reverseTraversalRecursive(linkedList.head, callback);
}
