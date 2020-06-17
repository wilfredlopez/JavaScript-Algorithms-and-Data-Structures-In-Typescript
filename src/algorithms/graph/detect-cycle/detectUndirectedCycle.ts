import depthFirstSearch, {
  DFSCallbacks,
} from "../depth-first-search/depthFirstSearch";
import Graph from "../../../data-structures/graph/Graph";
import GraphVertex from "../../../data-structures/graph/GraphVertex";
import { VertexPar } from "../articulation-points/articulationPoints";

/**
 * Detect cycle in undirected graph using Depth First Search.
 *
 * @param {Graph} graph
 */
export default function detectUndirectedCycle(graph: Graph) {
  let cycle: { [key: string]: GraphVertex } | null = null;

  // List of vertices that we have visited.
  const visitedVertices: { [key: string]: GraphVertex } = {};

  // List of parents vertices for every visited vertex.
  const parents: { [key: string]: GraphVertex } = {};

  // Callbacks for DFS traversing.
  const callbacks = {
    allowTraversal: (
      { currentVertex, nextVertex }: {
        currentVertex: GraphVertex;
        nextVertex: GraphVertex;
      },
    ) => {
      // Don't allow further traversal in case if cycle has been detected.
      if (cycle) {
        return false;
      }

      // Don't allow traversal from child back to its parent.
      const currentVertexParent = parents[currentVertex.getKey()];
      const currentVertexParentKey = currentVertexParent
        ? currentVertexParent.getKey()
        : null;

      const nextKey = nextVertex?.getKey();

      return currentVertexParentKey !== nextKey;
    },
    enterVertex: ({ currentVertex, previousVertex }: VertexPar) => {
      if (visitedVertices[currentVertex.getKey()]) {
        // Compile cycle path based on parents of previous vertices.
        cycle = {};

        let currentCycleVertex = currentVertex;
        let previousCycleVertex = previousVertex!;

        while (
          previousCycleVertex &&
          previousCycleVertex.getKey() !== currentVertex.getKey()
        ) {
          cycle[currentCycleVertex.getKey()] = previousCycleVertex;
          currentCycleVertex = previousCycleVertex;
          previousCycleVertex = parents[previousCycleVertex.getKey()];
        }

        cycle[currentCycleVertex.getKey()] = previousCycleVertex;
      } else {
        // Add next vertex to visited set.

        visitedVertices[currentVertex.getKey()] = currentVertex;
        parents[currentVertex.getKey()] = previousVertex!;
      }
    },
    leaveVertex: () => {},
  } as DFSCallbacks;

  // Start DFS traversing.
  const startVertex = graph.getAllVertices()[0];
  depthFirstSearch(graph, startVertex, callbacks);

  return cycle;
}
