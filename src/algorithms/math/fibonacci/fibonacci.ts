/**
 * Return a fibonacci sequence as an array.
 *
 * @param n
 * @return {number[]}
 */
export default function fibonacci(n: number) {
  if (n <= 1) return [1]
  let fivNums = [0, 1, 1]
  for (let i = 3; i <= n; i++) {
    fivNums[i] = fivNums[i - 1] + fivNums[i - 2]
  }

  return fivNums.slice(1)
}

// export default function fibonacci(n: number) {
//   const fibSequence = [1]

//   let currentValue = 1
//   let previousValue = 0

//   if (n === 1) {
//     return fibSequence
//   }

//   let iterationsCounter = n - 1

//   while (iterationsCounter) {
//     currentValue += previousValue
//     previousValue = currentValue - previousValue

//     fibSequence.push(currentValue)

//     iterationsCounter -= 1
//   }

//   return fibSequence
// }
