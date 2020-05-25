export default class DoublyLinkedListNode<T extends any> {
  public value: T
  public key: string = ""
  public next: DoublyLinkedListNode<T> | null
  public previous: DoublyLinkedListNode<T> | null = null

  constructor(
    value: T,
    next?: DoublyLinkedListNode<T>,
    prev?: DoublyLinkedListNode<T>,
  ) {
    this.value = value
    this.next = next || null
    this.previous = prev || null
    // this.next = args[1] || null
  }

  append(value: T) {
    if (!this.value) this.value = value
  }

  toString(callback?: (arg: T) => string): string {
    if (!callback) {
      return String(this.value)
    }
    return callback(this.value)
  }
}
