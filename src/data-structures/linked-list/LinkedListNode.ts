export default class LinkedListNode<T> {
  public value: T
  public next: LinkedListNode<T> | null = null

  constructor(value: T, next?: LinkedListNode<T>) {
    this.value = value
    this.next = next || null
  }

  toString(callback?: (arg: T) => string): string {
    if (!callback) {
      return String(this.value)
    }
    return callback(this.value)
  }
}
