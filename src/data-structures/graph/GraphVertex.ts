import GraphEdge from "./GraphEdge";

export default class GraphVertex<T extends any = any> {
  public value: T;
  public edges: Array<GraphEdge> = [];

  constructor(value?: T) {
    if (value === undefined) {
      throw new Error("Argument `value` is required");
    }
    this.value = value;
  }

  toString(): string {
    return `${this.value}`;
  }

  getKey(): string {
    return `${this.value}`;
  }

  getEdges(): Array<GraphEdge> {
    return this.edges;
  }

  addEdge(edge: GraphEdge): GraphVertex<T> {
    this.edges.push(edge);
    return this;
  }

  deleteEdge(edge: GraphEdge): void {
    const index = this.edges.findIndex((ed) => ed === edge);
    this.edges.splice(index, 1);
  }

  deleteAllEdges(): void {
    this.edges = [];
  }

  hasEdge(edge: GraphEdge): boolean {
    return this.edges.includes(edge);
  }

  getNeighbors(): Array<GraphVertex<T>> {
    return this.edges.map((s) =>
      s.endVertex !== this ? s.endVertex : s.startVertex
    );
  }

  hasNeighbor(vertex: GraphVertex<T>): boolean {
    return this.getNeighbors().includes(vertex);
  }

  findEdge(vertex: GraphVertex<T>): GraphEdge | null {
    const edge = this.edges.find((s) => s.endVertex === vertex);
    return edge ? edge : null;
  }

  getDegree() {
    return this.getNeighbors().length;
  }
}
