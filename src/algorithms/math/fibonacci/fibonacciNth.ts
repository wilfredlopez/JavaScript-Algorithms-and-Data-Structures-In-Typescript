/**
 * Calculate fibonacci number at specific position using Dynamic Programming approach.
 *
 * @param n
 * @return {number}
 */
export default function fibonacciNth(n: number) {
  if (n <= 2) return 1
  let seq = [0, 1, 1]
  for (let i = 3; i <= n; i++) {
    seq[i] = seq[i - 1] + seq[i - 2]
  }
  return seq[n]
}

// export default function fibonacciNth(n: number) {
//   let currentValue = 1
//   let previousValue = 0

//   if (n === 1) {
//     return 1
//   }

//   let iterationsCounter = n - 1

//   while (iterationsCounter) {
//     currentValue += previousValue
//     previousValue = currentValue - previousValue

//     iterationsCounter -= 1
//   }

//   return currentValue
// }
