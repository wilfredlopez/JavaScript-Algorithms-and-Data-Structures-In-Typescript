import LinkedList from "../linked-list/LinkedList"

export default class Queue<T extends any> {
  public linkedList: LinkedList<T> = new LinkedList<T>()

  public toString(stringifier?: (arg: T) => string) {
    return this.linkedList.toString(stringifier)
  }

  public isEmpty() {
    return this.peek() === null
  }

  public peek(): T | null {
    return this.linkedList.head?.value || null
  }

  public enqueue(val: T) {
    this.linkedList.append(val)
  }

  public dequeue(): T | null {
    return this.linkedList.deleteHead()?.value || null
  }
}
