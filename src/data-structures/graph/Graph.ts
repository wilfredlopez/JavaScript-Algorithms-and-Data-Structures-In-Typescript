import GraphVertex from "./GraphVertex";
import GraphEdge from "./GraphEdge";
import Matrix, { make } from "./AdjacencyMatrix";

export default class Graph {
  private vertices: GraphVertex[] = [];
  private edges: GraphEdge[] = [];
  public isDirected: boolean;

  constructor(directed: boolean = false) {
    this.isDirected = directed;
  }

  toString(): string {
    return this.vertices.map((s) => s.value).join(",");
  }

  addVertex(vertex: GraphVertex): Graph {
    if (!this.vertices.includes(vertex)) {
      this.vertices.push(vertex);
    }

    return this;
  }

  getVertexByKey(key: string): GraphVertex | undefined {
    return this.vertices.find((s) => s.value === key);
  }

  getAllVertices(): Array<GraphVertex> {
    return this.vertices;
  }

  addEdge(edge: GraphEdge): Graph {
    if (this.edges.includes(edge)) {
      throw new Error("Can't add the same edge twice.");
    }

    this.addVertex(edge.startVertex).addVertex(edge.endVertex);

    this.edges.push(edge);

    edge.startVertex.addEdge(edge);
    if (!this.isDirected) {
      edge.endVertex.addEdge(edge);
    }

    return this;
  }

  findEdge(vertexA: GraphVertex, vertexB: GraphVertex): GraphEdge | undefined {
    if (this.isDirected) {
      return this.edges.find(
        (ed) => ed.startVertex === vertexA && ed.endVertex === vertexB,
      );
    } else {
      return this.edges.find(
        (ed) =>
          (ed.startVertex === vertexA && ed.endVertex === vertexB) ||
          (ed.endVertex === vertexA && ed.startVertex === vertexB),
      );
    }
  }

  getAllEdges(): Array<GraphEdge> {
    return this.edges;
  }

  deleteEdge(edge: GraphEdge): void {
    const index = this.edges.findIndex((existing) =>
      existing.getKey() === edge.getKey()
    );
    if (index === -1) {
      throw new Error("That edge doesn't exist.");
    }

    this.edges.splice(index, 1);
  }

  getNeighbors(vertex: GraphVertex): Array<GraphVertex> {
    let ret: Array<GraphVertex> = [];

    if (!this.isDirected) {
      ret = vertex.getNeighbors();
    } else {
      const edges = this.edges.filter(
        (s) => s.endVertex !== vertex && s.startVertex === vertex,
      );
      if (edges.length) {
        ret = edges.map((s) => s.endVertex);
      }
    }
    return ret;
  }

  getWeight() {
    return this.edges.reduce((acum, cur) => cur.weight + acum, 0);
  }

  reverse() {
    this.getAllEdges().forEach((edge) => edge.reverse());
  }

  getVerticesIndices() {
    let ret: { [key: string]: number } = {};
    for (let i = 0; i < this.vertices.length; i++) {
      ret[this.vertices[i].value] = i;
    }
    // this.vertices.forEach((vertex, index) => (ret[vertex.value] = index));
    return ret;
  }

  getAdjacencyMatrix(): Matrix {
    const vertices = this.getAllVertices();
    const verticeIndices = this.getVerticesIndices();
    const length = vertices.length;

    let ret: Matrix = make(length, Infinity);

    for (const vertexIndex in verticeIndices) {
      const index = verticeIndices[vertexIndex];
      const vertex = this.getVertexByKey(vertexIndex);

      if (!vertex) {
        continue;
      }

      for (let i = 0; i < length; i++) {
        const vert = vertices[i];
        if (vertex.hasNeighbor(vert)) {
          const edge = vertex.findEdge(vert);
          ret[index][i] = edge && edge.weight ? edge.weight : 0;
        }
      }
    }

    return ret;
  }
}
