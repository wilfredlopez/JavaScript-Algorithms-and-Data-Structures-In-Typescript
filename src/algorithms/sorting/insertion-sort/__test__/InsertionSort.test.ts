import InsertionSort from "../InsertionSort";
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from "../../SortTester";

// Complexity constants.
const SORTED_ARRAY_VISITING_COUNT = 20;
const NOT_SORTED_ARRAY_VISITING_COUNT = 101;
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 210;
const EQUAL_ARRAY_VISITING_COUNT = 20;

const Sorter = new SortTester();

describe("InsertionSort", () => {
  it("should sort array", () => {
    Sorter.testSort(InsertionSort);
  });

  it("should sort array with custom comparator", () => {
    Sorter.testSortWithCustomComparator(InsertionSort);
  });

  it("should do stable sorting", () => {
    Sorter.testSortStability(InsertionSort);
  });

  it("should sort negative numbers", () => {
    Sorter.testNegativeNumbersSort(InsertionSort);
  });

  it("should visit EQUAL array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      InsertionSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      InsertionSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit NOT SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      InsertionSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit REVERSE SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      InsertionSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    );
  });
});
