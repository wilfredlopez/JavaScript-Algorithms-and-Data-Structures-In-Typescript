import fibonacci from "../fibonacci"

describe("fibonacci", () => {
  it("should calculate fibonacci correctly", () => {
    expect(fibonacci(0)).toEqual([1])
    expect(fibonacci(1)).toEqual([1])
    expect(fibonacci(2)).toEqual([1, 1])
    expect(fibonacci(3)).toEqual([1, 1, 2])
    expect(fibonacci(4)).toEqual([1, 1, 2, 3])
    expect(fibonacci(5)).toEqual([1, 1, 2, 3, 5])
    expect(fibonacci(6)).toEqual([1, 1, 2, 3, 5, 8])
    expect(fibonacci(7)).toEqual([1, 1, 2, 3, 5, 8, 13])
    expect(fibonacci(8)).toEqual([1, 1, 2, 3, 5, 8, 13, 21])
    expect(fibonacci(9)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34])
    expect(fibonacci(10)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55])
    expect(fibonacci(50)).toEqual([
      1,
      1,
      2,
      3,
      5,
      8,
      13,
      21,
      34,
      55,
      89,
      144,
      233,
      377,
      610,
      987,
      1597,
      2584,
      4181,
      6765,
      10946,
      17711,
      28657,
      46368,
      75025,
      121393,
      196418,
      317811,
      514229,
      832040,
      1346269,
      2178309,
      3524578,
      5702887,
      9227465,
      14930352,
      24157817,
      39088169,
      63245986,
      102334155,
      165580141,
      267914296,
      433494437,
      701408733,
      1134903170,
      1836311903,
      2971215073,
      4807526976,
      7778742049,
      12586269025,
    ])
  })
})
