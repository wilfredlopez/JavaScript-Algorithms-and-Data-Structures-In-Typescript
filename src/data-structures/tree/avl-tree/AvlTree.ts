import BinarySearchTree from "../binary-search-tree/BinarySearchTree";
import BinarySearchTreeNode from "../binary-search-tree/BinarySearchTreeNode";
import BinaryTreeNode from "../BinaryTreeNode";

export default class AvlTree<T extends any> extends BinarySearchTree<T> {
  /**
   * @param {*} value
   */
  insert(value: T) {
    // Do the normal BST insert.
    super.insert(value);

    // Let's move up to the root and check balance factors along the way.
    let currentNode: BinarySearchTreeNode<T> | null = this.root
      .find(value);
    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }
    return this.root;
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  remove(value: T) {
    // Do standard BST removal.
    const res = super.remove(value);

    // Balance the tree starting from the root node.
    this.balance(this.root);
    return res;
  }

  /**
   * @param {BinarySearchTreeNode} node
   */
  balance(node: BinarySearchTreeNode) {
    // If balance factor is not OK then try to balance the node.
    if (node.balanceFactor > 1) {
      // Left rotation.
      if (node.left && node.left.balanceFactor > 0) {
        // Left-Left rotation
        this.rotateLeftLeft(node);
      } else if (node.left && node.left.balanceFactor < 0) {
        // Left-Right rotation.
        this.rotateLeftRight(node);
      }
    } else if (node.balanceFactor < -1) {
      // Right rotation.
      if (node.right && node.right.balanceFactor < 0) {
        // Right-Right rotation
        this.rotateRightRight(node);
      } else if (node.right && node.right.balanceFactor > 0) {
        // Right-Left rotation.
        this.rotateRightLeft(node);
      }
    }
  }

  /**
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateLeftLeft(rootNode: BinarySearchTreeNode<T>) {
    // Detach left node from root node.
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    // Make left node to be a child of rootNode's parent.
    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode);
    } else if (rootNode === this.root) {
      // If root node is root then make left node to be a new root.
      this.root = leftNode as any;
    }

    // If left node has a right child then detach it and
    // attach it as a left child for rootNode.
    if (leftNode && leftNode.right) {
      rootNode.setLeft(leftNode.right);
    }

    // Attach rootNode to the right of leftNode.
    leftNode ? leftNode.setRight(rootNode) : undefined;
  }

  /**
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateLeftRight(rootNode: BinarySearchTreeNode) {
    // Detach left node from rootNode since it is going to be replaced.
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    // Detach right node from leftNode.
    const leftRightNode = leftNode ? leftNode.right : null;
    if (leftNode) leftNode.setRight(null);

    // Preserve leftRightNode's left subtree.
    if (leftRightNode && leftRightNode.left) {
      if (leftNode) leftNode.setRight(leftRightNode.left);
      leftRightNode.setLeft(null);
    }

    // Attach leftRightNode to the rootNode.
    rootNode.setLeft(leftRightNode);

    // Attach leftNode as left node for leftRight node.
    if (leftRightNode) leftRightNode.setLeft(leftNode);

    // Do left-left rotation.
    this.rotateLeftLeft(rootNode);
  }

  /**
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateRightLeft(rootNode: BinarySearchTreeNode) {
    // Detach right node from rootNode since it is going to be replaced.
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    // Detach left node from rightNode.
    if (rightNode) {
      const rightLeftNode = rightNode.left;
      rightNode.setLeft(null);

      if (rightLeftNode && rightLeftNode.right) {
        rightNode.setLeft(rightLeftNode.right);
        rightLeftNode.setRight(null);
      }

      // Attach rightLeftNode to the rootNode.
      rootNode.setRight(rightLeftNode);

      // Attach rightNode as right node for rightLeft node.
      if (rightLeftNode) {
        rightLeftNode.setRight(rightNode);
      }
    }

    // Do right-right rotation.
    this.rotateRightRight(rootNode);
  }

  /**
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateRightRight(rootNode: BinarySearchTreeNode) {
    // Detach right node from root node.
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    // Make right node to be a child of rootNode's parent.
    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode);
    } else if (rootNode === this.root) {
      // If root node is root then make right node to be a new root.
      this.root = rightNode as any;
    }

    // If right node has a left child then detach it and
    // attach it as a right child for rootNode.
    if (rightNode && rightNode.left) {
      rootNode.setRight(rightNode.left);
    }

    // Attach rootNode to the left of rightNode.
    if (rightNode) {
      rightNode.setLeft(rootNode);
    }
  }
}
