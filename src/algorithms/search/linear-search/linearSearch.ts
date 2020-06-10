import Comparator from "../../../utils/comparator/Comparator";

/**
 * Linear search implementation.
 *
 * @param {*[]} array
 * @param {*} seekElement
 * @param {function(a, b)} [comparatorCallback]
 * @return {number[]}
 */
export default function linearSearch<T extends any>(
  array: T[],
  seekElement: T,
  comparatorCallback?: (a: T, b: T) => 0 | 1 | -1,
) {
  const comparator = new Comparator<T>(comparatorCallback);
  const foundIndices: number[] = [];

  array.forEach((element, index) => {
    if (comparator.equal(element, seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
}
