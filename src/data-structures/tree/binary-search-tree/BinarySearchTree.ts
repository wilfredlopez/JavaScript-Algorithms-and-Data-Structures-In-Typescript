import BinarySearchTreeNode from "./BinarySearchTreeNode";
import Comparator, {
  ComparatorCallBack,
} from "../../../utils/comparator/Comparator";

export default class BinarySearchTree<T extends any> {
  /**
   * @param {function} [nodeValueCompareFunction]
   */
  root: BinarySearchTreeNode<T>;
  nodeComparator: Comparator<T>;
  value: T | null = null;
  constructor(nodeValueCompareFunction?: ComparatorCallBack) {
    this.root = new BinarySearchTreeNode<T>(null, nodeValueCompareFunction);

    // Steal node comparator from the root.
    this.nodeComparator = this.root.nodeValueComparator;
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  insert(value: T) {
    return this.root.insert(value);
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  contains(value: T) {
    return this.root.contains(value);
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  remove(value: T) {
    return this.root.remove(value);
  }

  /**
   * @return {string}
   */
  toString() {
    return this.root.toString();
  }
}
