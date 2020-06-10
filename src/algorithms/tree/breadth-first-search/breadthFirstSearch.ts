import Queue from "../../../data-structures/queue/Queue";
import BinaryTreeNode from "../../../data-structures/tree/BinaryTreeNode";

export interface BreadthFirstSearchCallbacks {
  allowTraversal: (node: BinaryTreeNode, child: BinaryTreeNode) => boolean;
  enterNode: (node: BinaryTreeNode) => void;
  leaveNode: (node: BinaryTreeNode) => void;
}

/**
 * @typedef {Object} Callbacks
 * @property {function(node: BinaryTreeNode, child: BinaryTreeNode): boolean} allowTraversal -
 *   Determines whether DFS should traverse from the node to its child.
 * @property {function(node: BinaryTreeNode)} enterNode - Called when DFS enters the node.
 * @property {function(node: BinaryTreeNode)} leaveNode - Called when DFS leaves the node.
 */

/**
 * @param {Callbacks} [callbacks]
 * @returns {Callbacks}
 */
function initCallbacks(
  callbacks: Partial<BreadthFirstSearchCallbacks> =
    {} as BreadthFirstSearchCallbacks,
) {
  const initiatedCallback = callbacks;

  const stubCallback = () => {};
  const defaultAllowTraversal = () => true;

  initiatedCallback.allowTraversal = callbacks.allowTraversal ||
    defaultAllowTraversal;
  initiatedCallback.enterNode = callbacks.enterNode || stubCallback;
  initiatedCallback.leaveNode = callbacks.leaveNode || stubCallback;

  return initiatedCallback;
}

/**
 * @param {BinaryTreeNode} rootNode
 * @param {Callbacks} [originalCallbacks]
 */
export default function breadthFirstSearch(
  rootNode: BinaryTreeNode,
  originalCallbacks: BreadthFirstSearchCallbacks =
    {} as BreadthFirstSearchCallbacks,
) {
  const callbacks = initCallbacks(
    originalCallbacks,
  ) as BreadthFirstSearchCallbacks;
  const nodeQueue = new Queue<BinaryTreeNode>();

  // Do initial queue setup.
  nodeQueue.enqueue(rootNode);

  while (!nodeQueue.isEmpty()) {
    const currentNode = nodeQueue.dequeue();

    callbacks.enterNode(currentNode!);

    // Add all children to the queue for future traversals.

    // Traverse left branch.
    if (
      currentNode!.left &&
      callbacks.allowTraversal(currentNode!, currentNode!.left!)
    ) {
      nodeQueue.enqueue(currentNode!.left);
    }

    // Traverse right branch.
    if (
      currentNode!.right &&
      callbacks.allowTraversal(currentNode!, currentNode!.right)
    ) {
      nodeQueue.enqueue(currentNode!.right);
    }

    callbacks.leaveNode(currentNode!);
  }
}
