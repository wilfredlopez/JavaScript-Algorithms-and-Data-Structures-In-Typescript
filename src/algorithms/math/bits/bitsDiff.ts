//should calculate bits difference between two numbers
export default function bitsDiff(num1: number, num2: number) {
  let setBitsCount = 0
  let number = num1 ^ num2

  while (number) {
    // Add last bit of the number to the sum of set bits.
    setBitsCount += number & 1

    // Shift number right by one bit to investigate other bits.
    number >>= 1
  }

  return setBitsCount
}
