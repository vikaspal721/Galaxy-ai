import { WorkflowEdge } from "@/types/workflow";

export interface GraphNode {
  id: string;
  dependencies: string[];
}

export function buildGraph(
  nodeIds: string[],
  edges: WorkflowEdge[]
): Map<string, string[]> {
  const graph = new Map<string, string[]>();

  // Initialize all nodes
  nodeIds.forEach((id) => graph.set(id, []));

  // Build dependency graph
  edges.forEach((edge) => {
    const dependencies = graph.get(edge.target) ?? [];
    dependencies.push(edge.source);
    graph.set(edge.target, dependencies);
  });

  return graph;
}

export function topologicalSort(
  nodeIds: string[],
  edges: WorkflowEdge[]
): string[] {
  const graph = buildGraph(nodeIds, edges);
  const inDegree = new Map<string, number>();
  const queue: string[] = [];
  const result: string[] = [];

  // Calculate in-degree for each node
  nodeIds.forEach((id) => {
    const dependencies = graph.get(id) ?? [];
    inDegree.set(id, dependencies.length);
    if (dependencies.length === 0) {
      queue.push(id);
    }
  });

  // Process nodes with no dependencies
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);

    // Update in-degree of dependent nodes
    edges.forEach((edge) => {
      if (edge.source === node) {
        const currentInDegree = inDegree.get(edge.target) ?? 0;
        const newInDegree = currentInDegree - 1;
        inDegree.set(edge.target, newInDegree);

        if (newInDegree === 0) {
          queue.push(edge.target);
        }
      }
    });
  }

  // Check for cycles
  if (result.length !== nodeIds.length) {
    throw new Error("Cycle detected in workflow graph");
  }

  return result;
}

export function hasCycle(nodeIds: string[], edges: WorkflowEdge[]): boolean {
  try {
    topologicalSort(nodeIds, edges);
    return false;
  } catch {
    return true;
  }
}
