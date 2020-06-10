/**
 * Traversal callback function.
 * @callback traversalCallback
 * @param {*} nodeValue
 */

import LinkedList from "../../../data-structures/linked-list/LinkedList";

/**
 * @param {LinkedList} linkedList
 * @param {traversalCallback} callback
 */
export default function traversal<T extends any>(
  linkedList: LinkedList<T>,
  callback: Function,
) {
  let currentNode = linkedList.head;

  while (currentNode) {
    callback(currentNode.value);
    currentNode = currentNode.next;
  }
}
