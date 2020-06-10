import SelectionSort from "../SelectionSort";
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from "../../SortTester";

// Complexity constants.
const SORTED_ARRAY_VISITING_COUNT = 209;
const NOT_SORTED_ARRAY_VISITING_COUNT = 209;
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 209;
const EQUAL_ARRAY_VISITING_COUNT = 209;

const Sorter = new SortTester();

describe("SelectionSort", () => {
  it("should sort array", () => {
    Sorter.testSort(SelectionSort);
  });

  it("should sort array with custom comparator", () => {
    Sorter.testSortWithCustomComparator(SelectionSort);
  });

  it("should sort negative numbers", () => {
    Sorter.testNegativeNumbersSort(SelectionSort);
  });

  it("should visit EQUAL array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      SelectionSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      SelectionSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit NOT SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      SelectionSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit REVERSE SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      SelectionSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    );
  });
});
