import HashTable from "../hash-table/HashTable"

export default class TrieNode {
  character: string
  isCompleteWord: boolean
  children: HashTable<TrieNode>
  /**
   * @param {string} character
   * @param {boolean} isCompleteWord
   */
  constructor(character: string, isCompleteWord = false) {
    this.character = character
    this.isCompleteWord = isCompleteWord
    this.children = new HashTable<TrieNode>()
  }

  addChild(character: string, isCompleteWord: boolean = false) {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord))
    }

    const childNode = this.children.get(character)!

    // In cases similar to adding "car" after "carpet" we need to mark "r" character as complete.
    childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord

    return childNode
  }

  getChild(character: string) {
    let child = this.children.get(character)!
    // if (!child) {
    //   return undefined
    // }
    return child
  }

  hasChild(character: string): boolean {
    return this.children.has(character)
  }

  hasChildren(): boolean {
    return this.children.getKeys().length !== 0
  }

  /**
   * @return {string[]}
   */
  suggestChildren() {
    return [...this.children.getKeys()]
  }

  /**
   * @return {string}
   */
  toString() {
    let childrenAsString = this.suggestChildren().toString()
    childrenAsString = childrenAsString ? `:${childrenAsString}` : ""
    const isCompleteString = this.isCompleteWord ? "*" : ""

    return `${this.character}${isCompleteString}${childrenAsString}`
  }

  /**
   * @param {string} character
   * @return {TrieNode}
   */
  removeChild(character: string) {
    const childNode = this.getChild(character)

    // Delete childNode only if:
    // - childNode has NO children,
    // - childNode.isCompleteWord === false.
    if (childNode && !childNode.isCompleteWord && !childNode.hasChildren()) {
      this.children.delete(character)
    }

    return this
  }
}
