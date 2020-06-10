import ShellSort from "../ShellSort";
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from "../../SortTester";

// Complexity constants.
const SORTED_ARRAY_VISITING_COUNT = 320;
const NOT_SORTED_ARRAY_VISITING_COUNT = 320;
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 320;
const EQUAL_ARRAY_VISITING_COUNT = 320;
const Sorter = new SortTester();
describe("ShellSort", () => {
  it("should sort array", () => {
    Sorter.testSort(ShellSort);
  });

  it("should sort array with custom comparator", () => {
    Sorter.testSortWithCustomComparator(ShellSort);
  });

  it("should sort negative numbers", () => {
    Sorter.testNegativeNumbersSort(ShellSort);
  });

  it("should visit EQUAL array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      ShellSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      ShellSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit NOT SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      ShellSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    );
  });

  it("should visit REVERSE SORTED array element specified number of times", () => {
    Sorter.testAlgorithmTimeComplexity(
      ShellSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    );
  });
});
