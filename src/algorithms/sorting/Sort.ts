import Comparator, {
  ComparatorCallBack,
} from "../../utils/comparator/Comparator";

/**
 * @typedef {Object} SorterCallbacks
 * @property {function(a: *, b: *)} compareCallback - If provided then all elements comparisons
 *  will be done through this callback.
 * @property {function(a: *)} visitingCallback - If provided it will be called each time the sorting
 *  function is visiting the next element.
 */

export default abstract class Sort<T extends any = any> {
  protected visitingCallback: (arr?: any[]) => (value: any) => void = () =>
    () => {};
  // protected comparator: (a: T, b: T) => number;
  protected comparator: Comparator<T>;

  protected lessThan(a: T, b: T) {
    return this.comparator.lessThan(a, b);
  }

  protected greaterThan(a: T, b: T) {
    // return this.comparator(a, b) === 1;
    return this.comparator.greaterThan(a, b);
  }

  protected equal(a: T, b: T) {
    // return this.comparator(a, b) === 0;
    return this.comparator.equal(a, b);
  }

  compareCallback: ComparatorCallBack<T>;

  constructor({
    visitingCallback,
    compareCallback,
  }: {
    visitingCallback?: () => (value: any) => void;
    compareCallback?: ComparatorCallBack<T>;
  } = {}) {
    if (visitingCallback !== undefined) {
      this.visitingCallback = visitingCallback;
    }

    if (compareCallback !== undefined) {
      this.comparator = new Comparator(compareCallback);
    } else {
      this.comparator = new Comparator((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });

      // this.comparator = (a: T, b: T) => {
      //   if (a < b) {
      //     return -1;
      //   }
      //   if (a > b) {
      //     return 1;
      //   }
      //   return 0;
      // };
    }
    this.compareCallback = compareCallback ||
      this.comparator.defaultCompareFunction;
  }

  abstract sort(arr: T[]): T[];
}
