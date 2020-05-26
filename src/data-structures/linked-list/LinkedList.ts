import LinkedListNode from "./LinkedListNode"

export default class LinkedList<T extends any>
  implements IterableIterator<LinkedListNode<T>> {
  private _head: LinkedListNode<T> | null = null
  private _tail: LinkedListNode<T> | null = null
  private _currentNode: LinkedListNode<T> | null = null;

  [Symbol.iterator](): IterableIterator<LinkedListNode<T>> {
    if (this._currentNode !== null) {
      throw new Error("unsafe action, iterator is busy")
    }
    return this
  }

  get head() {
    return this._head
  }

  append(value: T): LinkedList<T> {
    const node = new LinkedListNode<T>(value)
    if (!this.head) {
      this._head = node
    }
    if (this.tail) {
      this.tail.next = node
    }
    this._tail = node
    return this
  }

  prepend(value: T): LinkedList<T> {
    const node = new LinkedListNode<T>(value)
    if (this.head) {
      node.next = this.head
    }
    this._head = node
    if (!this.tail) {
      this._tail = node
    }
    return this
  }

  toString(callback?: (arg: T) => string): string {
    let arr = []
    for (const node of this) {
      arr.push(callback ? callback(node.value) : node.value)
    }
    return arr.join(",")
  }

  deleteHead(): LinkedListNode<T> | null {
    const ret = this._head
    if (this._head) {
      if (this._head === this._tail) {
        this._head = null
        this._tail = null
      } else {
        this._head = this._head.next
      }
    }
    return ret
  }
  deleteTail(): LinkedListNode<T> | null {
    const ret = this._tail
    if (this.tail) {
      if (this.tail === this.head) {
        this._head = null
        this._tail = null
      } else {
        for (const node of this) {
          if (node.next === this.tail) {
            node.next = null
            this._tail = node
          }
        }
      }
    }
    return ret
  }

  delete(val: T): LinkedListNode<T> | null {
    let foundNode: LinkedListNode<T> | null = null
    let node = this._head

    // make to remove all initial head references that match
    while (this._head?.value === val) {
      this.deleteHead()
    }

    while (node?.next) {
      if (node.next.value === val) {
        foundNode = node.next
        node.next = node.next.next
      } else {
        node = node.next
      }
    }

    // if tail is equal to val, set new tail
    if (this.tail?.value === val) {
      this._tail = node
    }

    return foundNode || null
  }

  find({
    value,
    callback,
  }: {
    value?: T
    callback?: (arg: T) => boolean
  }): LinkedListNode<T> | null {
    let node = this._head
    while (node) {
      if (node.value === value || (callback && callback(node.value))) {
        return node
      } else {
        node = node.next
      }
    }
    return null
  }

  get tail() {
    return this._tail
  }

  fromArray(arr: T[]) {
    for (let val of arr) {
      this.append(val)
    }
    return this
  }
  toArray() {
    const arr = []

    for (const val of this) {
      arr.push(val.value)
    }
    return arr
  }

  reverse() {
    let currentNode = this._head
    let prevNode = null
    let nextNode = null

    while (currentNode) {
      nextNode = currentNode.next

      currentNode.next = prevNode

      prevNode = currentNode
      currentNode = nextNode
    }

    this._tail = this._head
    this._head = prevNode

    return this
  }
  public next(): IteratorResult<LinkedListNode<T>> {
    if (!this._currentNode && this.head) {
      this._currentNode = this.head
      return {
        done: false,
        value: this._currentNode,
      }
    }

    const nextValue = this._currentNode && this._currentNode.next
    if (nextValue) {
      this._currentNode = nextValue
      return {
        done: false,
        value: nextValue,
      }
    }

    this._currentNode = null
    return {
      done: true,
      value: undefined,
    }
  }
}
