/**
 * find all primes less than or equal to maxNumber
 * @param {number} maxNumber
 * @return {number[]}
 */
// export default function sieveOfEratosthenes(maxNumber: number) {
//   const result: number[] = [];
//   for (let i = 2; i <= maxNumber; i++) {
//     if (isPrime(i)) {
//       result.push(i);
//     }
//   }
//   return result;
// }

// function isPrime(n: number) {
//   if (n < 2) return false;
//   if (n === 2) return true;
//   for (let i = 2; i < n; i++) {
//     if (n % i === 0) {
//       return false;
//     }
//   }
//   return true;
// }

export default function sieveOfEratosthenes(maxNumber: number) {
  const isPrime = new Array(maxNumber + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  const primes = [];

  for (let number = 2; number <= maxNumber; number += 1) {
    if (isPrime[number] === true) {
      primes.push(number);

      /*
         * Optimisation.
         * Start marking multiples of `p` from `p * p`, and not from `2 * p`.
         * The reason why this works is because, at that point, smaller multiples
         * of `p` will have already been marked `false`.
         *
         * Warning: When working with really big numbers, the following line may cause overflow
         * In that case, it can be changed to:
         * let nextNumber = 2 * number;
         */
      let nextNumber = number * number;

      while (nextNumber <= maxNumber) {
        isPrime[nextNumber] = false;
        nextNumber += number;
      }
    }
  }

  return primes;
}
