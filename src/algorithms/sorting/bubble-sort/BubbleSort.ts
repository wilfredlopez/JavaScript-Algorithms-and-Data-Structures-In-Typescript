import Sort from "../Sort";

export default class BubbleSort extends Sort {
  sort(originalArray: any[]) {
    // Flag that holds info about whether the swap has occur or not.
    let swapped = false;
    // Clone original array to prevent its modification.
    const array = [...originalArray];

    for (let i = 1; i < array.length; i += 1) {
      swapped = false;

      // Call visiting callback.
      this.visitingCallback(array[i]);

      for (let j = 0; j < array.length - i; j += 1) {
        // Call visiting callback.
        this.visitingCallback(array[j]);

        // Swap elements if they are in wrong order.
        if (this.comparator.lessThan(array[j + 1], array[j])) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];

          // Register the swap.
          swapped = true;
        }
      }

      // If there were no swaps then array is already sorted and there is
      // no need to proceed.
      if (!swapped) {
        return array;
      }
    }

    return array;
  }
  // private swap(arr: number[], firstIndex: number, secondIndex: number) {
  //   let temp = arr[firstIndex];
  //   arr[firstIndex] = arr[secondIndex];
  //   arr[secondIndex] = temp;
  // }

  // sort(arr: number[]): number[] {
  //   if (!arr.length || arr.length === 1) {
  //     return arr;
  //   }

  //   let copy = [...arr];

  //   let isSwapping: boolean = true;
  //   let lastSortedIndex = copy.length - 1;

  //   while (isSwapping) {
  //     isSwapping = false;
  //     this.visitingCallback();
  //     for (let i = 0; i < lastSortedIndex; i++) {
  //       this.visitingCallback();
  //       if (this.greaterThan(copy[i], copy[i + 1])) {
  //         this.swap(copy, i, i + 1);
  //         isSwapping = true;
  //       }
  //     }
  //     lastSortedIndex--;
  //   }

  //   return copy;
  // }
}
