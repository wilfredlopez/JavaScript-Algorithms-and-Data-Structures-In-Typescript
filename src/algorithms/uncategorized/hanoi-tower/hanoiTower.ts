import Stack from "../../../data-structures/stack/Stack";

interface HanoiTowerRecursiveProps {
  numberOfDiscs: number;
  fromPole: Stack<any>;
  withPole: Stack<any>;
  toPole: Stack<any>;
  moveCallback: (disc: number, fromPole: number[], toPole: number[]) => void;
}
/**
 * @param {number} numberOfDiscs
 * @param {Stack} fromPole
 * @param {Stack} withPole
 * @param {Stack} toPole
 * @param {function(disc: number, fromPole: number[], toPole: number[])} moveCallback
 */
function hanoiTowerRecursive({
  numberOfDiscs,
  fromPole,
  withPole,
  toPole,
  moveCallback,
}: HanoiTowerRecursiveProps) {
  if (numberOfDiscs === 1) {
    // Base case with just one disc.
    moveCallback(fromPole.peek(), fromPole.toArray(), toPole.toArray());
    const disc = fromPole.pop();
    toPole.push(disc);
  } else {
    // In case if there are more discs then move them recursively.

    // Expose the bottom disc on fromPole stack.
    hanoiTowerRecursive({
      numberOfDiscs: numberOfDiscs - 1,
      fromPole,
      withPole: toPole,
      toPole: withPole,
      moveCallback,
    });

    // Move the disc that was exposed to its final destination.
    hanoiTowerRecursive({
      numberOfDiscs: 1,
      fromPole,
      withPole,
      toPole,
      moveCallback,
    });

    // Move temporary tower from auxiliary pole to its final destination.
    hanoiTowerRecursive({
      numberOfDiscs: numberOfDiscs - 1,
      fromPole: withPole,
      withPole: fromPole,
      toPole,
      moveCallback,
    });
  }
}

type Nullable<T> = T extends null ? T : T | null;

/**
 * @param {number} numberOfDiscs
 * @param {function(disc: number, fromPole: number[], toPole: number[])} moveCallback
 * @param {Stack} [fromPole]
 * @param {Stack} [withPole]
 * @param {Stack} [toPole]
 */
export default function hanoiTower({
  numberOfDiscs,
  moveCallback,
  fromPole = new Stack(),
  withPole = new Stack(),
  toPole = new Stack(),
}:
  & Required<Pick<HanoiTowerRecursiveProps, "numberOfDiscs" | "moveCallback">>
  & Partial<HanoiTowerRecursiveProps>) {
  // Each of three poles of Tower of Hanoi puzzle is represented as a stack
  // that might contain elements (discs). Each disc is represented as a number.
  // Larger discs have bigger number equivalent.
  fromPole = fromPole || new Stack(),
    withPole = withPole || new Stack(),
    toPole = toPole || new Stack();
  // Let's create the discs and put them to the fromPole.
  for (let discSize = numberOfDiscs; discSize > 0; discSize -= 1) {
    fromPole.push(discSize);
  }

  hanoiTowerRecursive({
    numberOfDiscs,
    fromPole,
    withPole,
    toPole,
    moveCallback,
  });
}
