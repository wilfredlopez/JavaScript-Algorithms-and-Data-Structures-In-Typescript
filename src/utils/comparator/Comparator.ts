export type ComparatorCallBack<T extends any = any> = (
  a: T,
  b: T,
) => 0 | 1 | -1;

export default class Comparator<T extends any> {
  private compare: ComparatorCallBack<T>;

  constructor(compareFunction?: ComparatorCallBack<T>) {
    this.compare = compareFunction || this.defaultCompareFunction;
  }

  defaultCompareFunction(a: T, b: T): -1 | 0 | 1 {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  equal(a: T, b: T) {
    return this.compare(a, b) === 0;
  }

  lessThan(a: T, b: T) {
    return this.compare(a, b) < 0;
  }

  greaterThan(a: T, b: T) {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a: T, b: T) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a: T, b: T) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
