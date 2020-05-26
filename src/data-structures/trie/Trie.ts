import TrieNode from "./TrieNode"
// Character that we will use for trie tree root.
const HEAD_CHARACTER = "*"

export default class Trie {
  head: TrieNode
  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER)
  }

  addWord(word: string) {
    const characters = Array.from(word)
    let currentNode = this.head

    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      const isComplete = charIndex === characters.length - 1
      currentNode = currentNode.addChild(characters[charIndex], isComplete)
    }

    return this
  }

  private depthFirstDelete = (
    currentNode: TrieNode,
    word: string,
    charIndex = 0,
  ) => {
    if (charIndex >= word.length) {
      // Return if we're trying to delete the character that is out of word's scope.
      return
    }

    const character = word[charIndex]
    const nextNode = currentNode.getChild(character)

    if (nextNode == null) {
      // Return if we're trying to delete a word that has not been added to the Trie.
      return
    }

    // Go deeper.
    this.depthFirstDelete(nextNode, word, charIndex + 1)

    // Since we're going to delete a word let's un-mark its last character isCompleteWord flag.
    if (charIndex === word.length - 1) {
      nextNode.isCompleteWord = false
    }

    // childNode is deleted only if:
    // - childNode has NO children
    // - childNode.isCompleteWord === false
    currentNode.removeChild(character)
  }

  /**
   * @param {string} word
   * @return {Trie}
   */
  deleteWord(word: string) {
    // Start depth-first deletion from the head node.
    this.depthFirstDelete(this.head, word)

    return this
  }
  private getLastCharacterNode(word: string) {
    const characters = Array.from(word)
    let currentNode = this.head

    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      if (!currentNode.hasChild(characters[charIndex])) {
        return null
      }

      currentNode = currentNode.getChild(characters[charIndex])
    }

    return currentNode
  }
  suggestNextCharacters(word: string) {
    const lastCharacter = this.getLastCharacterNode(word)

    if (!lastCharacter) {
      return null
    }

    return lastCharacter.suggestChildren()
  }
  doesWordExist(word: string): boolean {
    const lastCharacter = this.getLastCharacterNode(word)

    return !!lastCharacter && lastCharacter.isCompleteWord
  }
}
