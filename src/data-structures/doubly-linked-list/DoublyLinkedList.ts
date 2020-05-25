import DoublyLinkedListNode from "./DoublyLinkedListNode"
import Comparator from "../../utils/comparator/Comparator"

export default class DoublyLinkedList<T> {
  public head: DoublyLinkedListNode<T> | null = null
  public tail: DoublyLinkedListNode<T> | null = null

  public compare: Comparator<T>
  private list: DoublyLinkedListNode<T>[] = []

  constructor(comparator?: (a: any, b: any) => 0 | 1 | -1) {
    this.compare = new Comparator<T>(comparator)
  }
  /**
   * @return {DoublyLinkedListNode[]}
   */
  toArray() {
    const nodes = []

    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback?: (arg: T) => string): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString()
  }

  private traverse() {}

  append(value: T) {
    const newNode = new DoublyLinkedListNode(value)

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }

    // Attach new node to the end of linked list.
    this.tail!.next = newNode

    // Attach current tail to the new node's previous reference.
    newNode.previous = this.tail

    // Set new node to be the tail of linked list.
    this.tail = newNode

    return this
  }

  /**
   * @param {*} value
   * @return {DoublyLinkedList}
   */
  prepend(value: T): DoublyLinkedList<T> {
    // Make new node to be a head.
    const newNode = new DoublyLinkedListNode(value, this.head as any)

    // If there is head, then it won't be head anymore.
    // Therefore, make its previous reference to be new node (new head).
    // Then mark the new node as head.
    if (this.head) {
      this.head.previous = newNode
    }
    this.head = newNode

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode
    }

    return this
  }

  /**
   * @param {*} value
   * @return {DoublyLinkedListNode}
   */
  delete(value: T): DoublyLinkedListNode<T> | null {
    if (!this.head) {
      return null
    }

    let deletedNode = null
    let currentNode: DoublyLinkedListNode<T> | null = this.head

    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        deletedNode = currentNode

        if (deletedNode === this.head) {
          // If HEAD is going to be deleted...

          // Set head to second node, which will become new head.
          this.head = deletedNode.next

          // Set new head's previous to null.
          if (this.head) {
            this.head.previous = null
          }

          // If all the nodes in list has same value that is passed as argument
          // then all nodes will get deleted, therefore tail needs to be updated.
          if (deletedNode === this.tail) {
            this.tail = null
          }
        } else if (deletedNode === this.tail) {
          // If TAIL is going to be deleted...

          // Set tail to second last node, which will become new tail.
          this.tail = deletedNode.previous
          this.tail!.next = null
        } else {
          // If MIDDLE node is going to be deleted...
          const previousNode = deletedNode.previous
          const nextNode = deletedNode.next

          previousNode!.next = nextNode
          nextNode!.previous = previousNode
        }
      }

      currentNode = currentNode.next
    }

    return deletedNode
  }

  deleteTail(): DoublyLinkedListNode<T> | null {
    if (!this.tail) {
      // No tail to delete.
      return null
    }

    if (this.head === this.tail) {
      // There is only one node in linked list.
      const deletedTail = this.tail
      this.head = null
      this.tail = null

      return deletedTail
    }

    // If there are many nodes in linked list...
    const deletedTail = this.tail

    this.tail = this.tail.previous
    this.tail!.next = null

    return deletedTail
  }

  deleteHead(): DoublyLinkedListNode<T> | null {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
      this.head.previous = null
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  fromArray(arr: Array<T>): DoublyLinkedList<T> {
    for (let val of arr) {
      this.append(val)
    }
    return this
  }

  reverse() {
    let currNode = this.head
    let prevNode = null
    let nextNode = null

    while (currNode) {
      // Store next node.
      nextNode = currNode.next
      prevNode = currNode.previous

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode
      currNode.previous = nextNode

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode
      currNode = nextNode
    }

    // Reset head and tail.
    this.tail = this.head
    this.head = prevNode

    return this
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {DoublyLinkedListNode}
   */
  find({
    value,
    callback,
  }: {
    value?: T
    callback?: (arg: T) => boolean
  }): DoublyLinkedListNode<T> | null {
    if (!this.head) {
      return null
    }

    let currentNode: DoublyLinkedListNode<T> | null = this.head

    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode
      }

      // If value is specified then try to compare by value..
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }
}
