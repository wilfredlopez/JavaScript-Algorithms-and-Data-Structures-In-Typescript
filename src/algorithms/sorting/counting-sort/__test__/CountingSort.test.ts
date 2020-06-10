import CountingSort from "../CountingSort";
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from "../../SortTester";

// Complexity constants.
const SORTED_ARRAY_VISITING_COUNT = 60;
const NOT_SORTED_ARRAY_VISITING_COUNT = 60;
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 60;
const EQUAL_ARRAY_VISITING_COUNT = 60;
const Sorter = new SortTester();
describe("CountingSort", () => {
  it("should sort array", () => {
    Sorter.testSort(CountingSort);
  });

  it("should sort negative numbers", () => {
    Sorter.testNegativeNumbersSort(CountingSort);
  });

  it("should allow to use specify max/min integer value in array to make sorting faster", () => {
    const visitingCallback = jest.fn();
    const sorter = new CountingSort({ visitingCallback });

    // Detect biggest number in array in prior.
    const biggestElement = Math.max(...notSortedArr);

    // Detect smallest number in array in prior.
    const smallestElement = Math.min(...notSortedArr);

    const sortedArray = sorter.sort(
      notSortedArr,
      smallestElement,
      biggestElement,
    );

    expect(sortedArray).toEqual(sortedArr);
    // Normally visitingCallback is being called 60 times but in this case
    // it should be called only 40 times.
    expect(visitingCallback).toHaveBeenCalledTimes(40);
  });

  it("should visit EQUAL array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      CountingSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      CountingSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit NOT SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      CountingSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit REVERSE SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      CountingSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    );
  });
});
