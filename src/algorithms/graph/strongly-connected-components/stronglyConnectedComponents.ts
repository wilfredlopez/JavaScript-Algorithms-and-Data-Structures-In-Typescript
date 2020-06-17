import Stack from "../../../data-structures/stack/Stack";
import depthFirstSearch, {
  DFSCallbacks,
} from "../depth-first-search/depthFirstSearch";
import Graph from "../../../data-structures/graph/Graph";
import GraphVertex from "../../../data-structures/graph/GraphVertex";
import { ObjectOf } from "../../../utils/ObjectOf";

/**
 * @param {Graph} graph
 * @return {Stack}
 */
function getVerticesSortedByDfsFinishTime(graph: Graph) {
  // Set of all visited vertices during DFS pass.
  const visitedVerticesSet: ObjectOf<GraphVertex> = {};

  // Stack of vertices by finish time.
  // All vertices in this stack are ordered by finished time in decreasing order.
  // Vertex that has been finished first will be at the bottom of the stack and
  // vertex that has been finished last will be at the top of the stack.
  const verticesByDfsFinishTime = new Stack<GraphVertex>();

  // Set of all vertices we're going to visit.
  const notVisitedVerticesSet: ObjectOf<GraphVertex> = {};
  graph.getAllVertices().forEach((vertex) => {
    notVisitedVerticesSet[vertex.getKey()] = vertex;
  });

  // Specify DFS traversal callbacks.
  const dfsCallbacks: DFSCallbacks = {
    enterVertex: ({ currentVertex }) => {
      // Add current vertex to visited set.
      visitedVerticesSet[currentVertex.getKey()] = currentVertex;

      // Delete current vertex from not visited set.
      delete notVisitedVerticesSet[currentVertex.getKey()];
    },
    leaveVertex: ({ currentVertex }) => {
      // Push vertex to the stack when leaving it.
      // This will make stack to be ordered by finish time in decreasing order.
      verticesByDfsFinishTime.push(currentVertex);
    },
    allowTraversal: ({ nextVertex }) => {
      // Don't allow to traverse the nodes that have been already visited.
      return !visitedVerticesSet[nextVertex.getKey()];
    },
  };

  // Do FIRST DFS PASS traversal for all graph vertices to fill the verticesByFinishTime stack.
  while (Object.values(notVisitedVerticesSet).length) {
    // Peek any vertex to start DFS traversal from.
    const startVertexKey = Object.keys(notVisitedVerticesSet)[0];
    const startVertex = notVisitedVerticesSet[startVertexKey];
    delete notVisitedVerticesSet[startVertexKey];

    depthFirstSearch(graph, startVertex, dfsCallbacks);
  }

  return verticesByDfsFinishTime;
}

/**
 * @param {Graph} graph
 * @param {Stack} verticesByFinishTime
 * @return {*[]}
 */
function getSCCSets(graph: Graph, verticesByFinishTime: Stack<GraphVertex>) {
  // Array of arrays of strongly connected vertices.
  const stronglyConnectedComponentsSets: Array<GraphVertex[]> = [];

  // Array that will hold all vertices that are being visited during one DFS run.
  let stronglyConnectedComponentsSet: GraphVertex[] = [];

  // Visited vertices set.
  const visitedVerticesSet: ObjectOf<GraphVertex> = {};

  // Callbacks for DFS traversal.
  const dfsCallbacks: DFSCallbacks = {
    enterVertex: ({ currentVertex }) => {
      // Add current vertex to SCC set of current DFS round.
      stronglyConnectedComponentsSet.push(currentVertex);

      // Add current vertex to visited set.
      visitedVerticesSet[currentVertex.getKey()] = currentVertex;
    },
    leaveVertex: ({ previousVertex }) => {
      // Once DFS traversal is finished push the set of found strongly connected
      // components during current DFS round to overall strongly connected components set.
      // The sign that traversal is about to be finished is that we came back to start vertex
      // which doesn't have parent.
      if (previousVertex === null) {
        stronglyConnectedComponentsSets.push(
          [...stronglyConnectedComponentsSet],
        );
      }
    },
    allowTraversal: ({ nextVertex }) => {
      // Don't allow traversal of already visited vertices.
      return !visitedVerticesSet[nextVertex.getKey()];
    },
  };

  while (!verticesByFinishTime.isEmpty()) {
    /** @var {GraphVertex} startVertex */
    const startVertex = verticesByFinishTime.pop()!;

    // Reset the set of strongly connected vertices.
    stronglyConnectedComponentsSet = [];

    // Don't do DFS on already visited vertices.
    if (!visitedVerticesSet[startVertex.getKey()]) {
      // Do DFS traversal.
      depthFirstSearch(graph, startVertex, dfsCallbacks);
    }
  }

  return stronglyConnectedComponentsSets;
}

/**
 * Kosaraju's algorithm.
 *
 * @param {Graph} graph
 * @return {*[]}
 */
export default function stronglyConnectedComponents(graph: Graph) {
  // In this algorithm we will need to do TWO DFS PASSES overt the graph.

  // Get stack of vertices ordered by DFS finish time.
  // All vertices in this stack are ordered by finished time in decreasing order:
  // Vertex that has been finished first will be at the bottom of the stack and
  // vertex that has been finished last will be at the top of the stack.
  const verticesByFinishTime = getVerticesSortedByDfsFinishTime(graph);

  // Reverse the graph.
  graph.reverse();

  // Do DFS once again on reversed graph.
  return getSCCSets(graph, verticesByFinishTime);
}
