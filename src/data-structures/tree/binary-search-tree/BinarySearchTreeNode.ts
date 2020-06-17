import BinaryTreeNode from "../BinaryTreeNode";
import Comparator, {
  ComparatorCallBack,
} from "../../../utils/comparator/Comparator";

export default class BinarySearchTreeNode<T extends any = any>
  extends BinaryTreeNode<T> {
  /**
   * @param {*} [value] - node value.
   * @param {function} [compareFunction] - comparator function for node values.
   */
  compareFunction: ComparatorCallBack<(T | null)>;
  nodeValueComparator: Comparator<(T | null)>;
  left: BinarySearchTreeNode<T> | null = null;
  right: BinarySearchTreeNode<T> | null = null;
  parent: BinarySearchTreeNode<T> | null = null;
  constructor(
    value: T | null = null,
    compareFunction?: ComparatorCallBack<(T | null)>,
  ) {
    super(value);

    // This comparator is used to compare node values with each other.
    this.nodeValueComparator = new Comparator<(T | null)>(compareFunction);
    this.compareFunction = compareFunction ||
      this.nodeValueComparator.defaultCompareFunction;
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  insert(value: T | null = null): BinarySearchTreeNode {
    if (this.nodeValueComparator.equal(this.value, null as any)) {
      this.value = value;

      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      // Insert to the left.
      if (this.left) {
        return this.left.insert(value as any);
      }

      const newNode = new BinarySearchTreeNode(
        value as any,
        this.compareFunction,
      );
      this.setLeft(newNode);

      return newNode;
    }

    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      // Insert to the right.
      if (this.right) {
        return this.right.insert(value as any);
      }

      const newNode = new BinarySearchTreeNode(
        value as any,
        this.compareFunction,
      );
      this.setRight(newNode);

      return newNode;
    }

    return this;
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  find(value: T): BinarySearchTreeNode<T> | null {
    // Check the root.
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
      // Check left nodes.
      if (this.left) {
        return this.left.find(value);
      }
    }

    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
      // Check right nodes.
      return this.right.find(value);
    }

    return null;
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  contains(value: T) {
    return !!this.find(value);
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  remove(value: T) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error("Item not found in the tree");
    }

    const { parent } = nodeToRemove;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // Node is a leaf and thus has no children.
      if (parent) {
        // Node has a parent. Just remove the pointer to this node from the parent.
        parent.removeChild(nodeToRemove);
      } else {
        // Node has no parent. Just erase current node value.
        nodeToRemove.setValue(null);
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // Node has two children.
      // Find the next biggest value (minimum value in the right branch)
      // and replace current value node with that next biggest value.
      const nextBiggerNode = nodeToRemove.right.findMin();
      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        this.remove(nextBiggerNode.value!);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        // In case if next right value is the next bigger one and it doesn't have left child
        // then just replace node that is going to be deleted with the right node.
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      // Node has only one child.
      // Make this child to be a direct child of current node's parent.
      /** @var BinarySearchTreeNode */
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode!);
      } else {
        BinaryTreeNode.copyNode(childNode!, nodeToRemove);
      }
    }

    // Clear the parent of removed node.
    nodeToRemove.parent = null;

    return true;
  }

  /**
   * @return {BinarySearchTreeNode}
   */
  findMin(): BinarySearchTreeNode<T> {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }
}
