/**
 * @param {number} number
 * @param {number} bitPosition - zero based.
 * @return {number}
 */
export default function getBit(number: number, bitPosition: number) {
  return (number >> bitPosition) & 1
}
