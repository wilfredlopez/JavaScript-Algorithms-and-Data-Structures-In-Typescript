/**
 * @param {number} number
 * @return {number}
 */
export default function factorialRecursive(number: number): number {
  if (number <= 1) {
    return 1
  }
  return number * factorialRecursive(number - 1)
}
