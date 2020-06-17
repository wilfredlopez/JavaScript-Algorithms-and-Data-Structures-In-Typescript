import Graph from "../../../data-structures/graph/Graph";
import GraphVertex from "../../../data-structures/graph/GraphVertex";
import { VertexPar } from "../articulation-points/articulationPoints";

export interface DFSCallbacks {
  enterVertex: ({ currentVertex, previousVertex }: VertexPar) => void;
  leaveVertex: ({ currentVertex, previousVertex }: VertexPar) => void;
  allowTraversal: ({}: {
    previousVertex: GraphVertex | null;
    currentVertex: GraphVertex;
    nextVertex: GraphVertex;
  }) => boolean;
}

// /**
//  * @typedef {Object} Callbacks
//  *
//  * @property {function(vertices: Object): boolean} [allowTraversal] -
//  *  Determines whether DFS should traverse from the vertex to its neighbor
//  *  (along the edge). By default prohibits visiting the same vertex again.
//  *
//  * @property {function(vertices: Object)} [enterVertex] - Called when DFS enters the vertex.
//  *
//  * @property {function(vertices: Object)} [leaveVertex] - Called when DFS leaves the vertex.
//  */

// /**
//  * @param {Callbacks} [callbacks]
//  * @returns {Callbacks}
//  */
// function initCallbacks(
//   callbacks: DFSCallbacks = {
//     allowTraversal: () => false,
//     enterVertex: () => {},
//     leaveVertex: () => {},
//   },
// ) {
//   const initiatedCallback = callbacks;

//   const stubCallback = () => {};

//   const allowTraversalCallback = (() => {
//     const seen: { [key: string]: any } = {};
//     return ({ nextVertex }: any) => {
//       if (!seen[nextVertex.getKey()]) {
//         seen[nextVertex.getKey()] = true;
//         return true;
//       }
//       return false;
//     };
//   })();

//   initiatedCallback.allowTraversal = callbacks.allowTraversal ||
//     allowTraversalCallback;
//   initiatedCallback.enterVertex = callbacks.enterVertex || stubCallback;
//   initiatedCallback.leaveVertex = callbacks.leaveVertex || stubCallback;

//   return initiatedCallback;
// }

// export default function depthFirstSearch(
//   graph: Graph,
//   startVertex: GraphVertex,
//   callbacks: Partial<DFSCallbacks> = {},
// ) {
//   const previousVertex = null;
//   depthFirstSearchRecursive(
//     graph,
//     startVertex,
//     previousVertex,
//     initCallbacks({
//       allowTraversal: () => {
//         return false;
//       },
//       enterVertex: () => {},
//       leaveVertex: () => {},
//       ...callbacks,
//     }),
//   );
// }

// /**
//  * @param {Graph} graph
//  * @param {GraphVertex} currentVertex
//  * @param {GraphVertex} previousVertex
//  * @param {Callbacks} callbacks
//  */
// function depthFirstSearchRecursive(
//   graph: Graph,
//   currentVertex: GraphVertex,
//   previousVertex: GraphVertex | null,
//   callbacks: DFSCallbacks,
// ) {
//   callbacks.enterVertex({ currentVertex, previousVertex });

//   graph.getNeighbors(currentVertex).forEach((nextVertex) => {
//     if (
//       callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })
//     ) {
//       depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
//     }
//   });

//   callbacks.leaveVertex({ currentVertex, previousVertex });
// }

/**
 * @typedef {Object} Callbacks
 *
 * @property {function(vertices: Object): boolean} [allowTraversal] -
 *  Determines whether DFS should traverse from the vertex to its neighbor
 *  (along the edge). By default prohibits visiting the same vertex again.
 *
 * @property {function(vertices: Object)} [enterVertex] - Called when DFS enters the vertex.
 *
 * @property {function(vertices: Object)} [leaveVertex] - Called when DFS leaves the vertex.
 */

/**
 * @param {Callbacks} [callbacks]
 * @returns {Callbacks}
 */
function initCallbacks(callbacks: Partial<DFSCallbacks> = {}) {
  const initiatedCallback = callbacks;

  const stubCallback = () => {};

  const allowTraversalCallback = (
    () => {
      const seen: { [key: string]: any } = {};
      return ({ nextVertex }: { nextVertex: any }) => {
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
 * @param {GraphVertex} currentVertex
 * @param {GraphVertex} previousVertex
 * @param {Callbacks} callbacks
 */
function depthFirstSearchRecursive(
  graph: Graph,
  currentVertex: GraphVertex,
  previousVertex: GraphVertex | null,
  callbacks: Partial<DFSCallbacks> = {},
) {
  callbacks.enterVertex &&
    callbacks.enterVertex({ currentVertex, previousVertex });

  graph.getNeighbors(currentVertex).forEach((nextVertex) => {
    if (
      callbacks.allowTraversal
        ? callbacks.allowTraversal(
          { previousVertex, currentVertex, nextVertex },
        )
        : false
    ) {
      depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
    }
  });

  callbacks.leaveVertex &&
    callbacks.leaveVertex({ currentVertex, previousVertex });
}

/**
 * @param {Graph} graph
 * @param {GraphVertex} startVertex
 * @param {Callbacks} [callbacks]
 */
export default function depthFirstSearch(
  graph: Graph,
  startVertex: GraphVertex,
  callbacks: DFSCallbacks,
) {
  const previousVertex = null;
  depthFirstSearchRecursive(
    graph,
    startVertex,
    previousVertex,
    initCallbacks(callbacks),
  );
}
