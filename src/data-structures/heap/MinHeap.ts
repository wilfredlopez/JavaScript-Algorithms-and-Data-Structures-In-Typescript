import Heap from "./Heap";
import { ComparatorCallBack } from "../../utils/comparator/Comparator";

export default class MinHeap<T> extends Heap<T> {
  constructor(compareFn?: ComparatorCallBack) {
    super(compareFn);
  }
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */
  pairIsInCorrectOrder(firstElement: T, secondElement: T) {
    return this.compare.lessThanOrEqual(firstElement, secondElement);
  }
}
