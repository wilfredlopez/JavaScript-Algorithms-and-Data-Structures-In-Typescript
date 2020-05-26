//should clear bit at specific position
export default function clearBit(number: number, bitPosition: number) {
  const mask = ~(1 << bitPosition)

  return number & mask
}
