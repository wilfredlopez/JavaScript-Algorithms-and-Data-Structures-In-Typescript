import Queue from "../../../data-structures/queue/Queue";
import GraphVertex from "../../../data-structures/graph/GraphVertex";
import Graph from "../../../data-structures/graph/Graph";

export interface VertextObject {
  currentVertex: GraphVertex | null;
  previousVertex: GraphVertex | null;
  nextVertex?: GraphVertex | null;
}
export interface BFSCallbacks {
  enterVertex: (vertices: VertextObject) => void;
  leaveVertex: (vertices: VertextObject) => void;
  allowTraversal: (vertices: VertextObject) => boolean;
}
/**
 * @typedef {Object} Callbacks
 *
 * @property {function(vertices: Object): boolean} [allowTraversal] -
 *   Determines whether DFS should traverse from the vertex to its neighbor
 *   (along the edge). By default prohibits visiting the same vertex again.
 *
 * @property {function(vertices: Object)} [enterVertex] - Called when BFS enters the vertex.
 *
 * @property {function(vertices: Object)} [leaveVertex] - Called when BFS leaves the vertex.
 */

/**
 * @param {Callbacks} [callbacks]
 * @returns {Callbacks}
 */
function initCallbacks(callbacks: BFSCallbacks = {} as BFSCallbacks) {
  const initiatedCallback: BFSCallbacks = callbacks as BFSCallbacks;

  const stubCallback = () => {};

  const allowTraversalCallback = (
    () => {
      const seen: { [key: string]: boolean } = {};
      return ({ nextVertex }: { nextVertex: GraphVertex }) => {
        if (!seen[nextVertex.getKey()]) {
          seen[nextVertex.getKey()] = true;
          return true;
        }
        return false;
      };
    }
  )();

  initiatedCallback.allowTraversal = callbacks.allowTraversal ||
    allowTraversalCallback;
  initiatedCallback.enterVertex = callbacks.enterVertex || stubCallback;
  initiatedCallback.leaveVertex = callbacks.leaveVertex || stubCallback;

  return initiatedCallback;
}

/**
 * @param {Graph} graph
 * @param {GraphVertex} startVertex
 * @param {Callbacks} [originalCallbacks]
 */
export default function breadthFirstSearch(
  graph: Graph,
  startVertex: GraphVertex,
  originalCallbacks: Partial<BFSCallbacks> = {},
) {
  const callbacks = initCallbacks(originalCallbacks as BFSCallbacks);
  const vertexQueue = new Queue<GraphVertex>();

  // Do initial queue setup.
  vertexQueue.enqueue(startVertex);

  let previousVertex: GraphVertex | null = null;

  // Traverse all vertices from the queue.
  while (!vertexQueue.isEmpty()) {
    const currentVertex = vertexQueue.dequeue();
    callbacks.enterVertex({ currentVertex, previousVertex } as VertextObject);

    // Add all neighbors to the queue for future traversals.
    graph.getNeighbors(currentVertex!).forEach((nextVertex) => {
      if (
        callbacks.allowTraversal
          ? callbacks.allowTraversal(
            { previousVertex, currentVertex, nextVertex },
          )
          : false
      ) {
        vertexQueue.enqueue(nextVertex);
      }
    });

    callbacks.leaveVertex({ currentVertex, previousVertex } as VertextObject);

    // Memorize current vertex before next loop.
    previousVertex = currentVertex;
  }
}
