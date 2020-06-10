import Comparator, {
  ComparatorCallBack,
} from "../../../utils/comparator/Comparator";

/**
 * Binary search implementation.
 *
 * @param {*[]} sortedArray
 * @param {*} seekElement
 * @param {function(a, b)} [comparatorCallback]
 * @return {number}
 */

export default function binarySearch<T>(
  sortedArray: T[],
  seekElement: T,
  comparatorCallback?: ComparatorCallBack<T>,
): number {
  const compare = new Comparator(comparatorCallback);

  let start = 0;
  let end = sortedArray.length - 1;

  while (start <= end) {
    let mid = start + Math.floor(end - start / 2);

    if (compare.equal(sortedArray[mid], seekElement)) {
      return mid;
    }

    if (compare.lessThan(sortedArray[mid], seekElement)) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}
