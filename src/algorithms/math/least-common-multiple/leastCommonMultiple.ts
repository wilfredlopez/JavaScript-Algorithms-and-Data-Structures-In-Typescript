import euclideanAlgorithm from "../euclidean-algorithm/euclideanAlgorithm";

export default function leastCommonMultiple(a: number, b: number) {
  //My Solution:
  //   if (a === 0 || b === 0) return 0;
  //   if (a === b) return 1;
  //   a = Math.abs(a);
  //   b = Math.abs(b);
  //   const max = Math.max(a, b);
  //   let multiplesA: { [key: number]: number } = {};
  //   let multiplesB: { [key: number]: number } = {};
  //   let min = Number.MAX_SAFE_INTEGER;
  //   for (let i = 1; i <= max; i++) {
  //     const currentA = a * i;
  //     multiplesA[currentA] = currentA;
  //     const currentB = b * i;
  //     multiplesB[currentB] = currentB;
  //   }

  //   for (let n in multiplesA) {
  //     if (multiplesB[n]) {
  //       min = Math.min(multiplesA[n], min);
  //     }
  //   }

  //   if (min === Number.MAX_SAFE_INTEGER) return -1;
  //   return min;

  //Other Solution.
  return ((a === 0) || (b === 0))
    ? 0
    : Math.abs(a * b) / euclideanAlgorithm(a, b);
}

// leastCommonMultiple(4, 6);
