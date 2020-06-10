import Sort from "../Sort";
import MinHeap from "../../../data-structures/heap/MinHeap";

export default class HeapSort extends Sort {
  sort(originalArray: any[]) {
    const sortedArray = [];
    const minHeap = new MinHeap<any>(this.compareCallback);

    // Insert all array elements to the heap.
    originalArray.forEach((element) => {
      // Call visiting callback.
      this.visitingCallback(element);

      minHeap.add(element);
    });

    // Now we have min heap with minimal element always on top.
    // Let's poll that minimal element one by one and thus form the sorted array.
    while (!minHeap.isEmpty()) {
      const nextMinElement = minHeap.poll();

      // Call visiting callback.
      this.visitingCallback(nextMinElement);

      sortedArray.push(nextMinElement);
    }

    return sortedArray;
  }
}
