import { task } from "@trigger.dev/sdk/v3";
import { topologicalSort } from "@/lib/dag/topoSort";
import { BaseNode, WorkflowEdge } from "@/types/workflow";

interface NodeExecutionResult {
  nodeId: string;
  output: Record<string, unknown>;
}

export async function executeWorkflow(
  nodes: BaseNode[],
  edges: WorkflowEdge[]
): Promise<NodeExecutionResult[]> {
  const nodeIds = nodes.map((n) => n.id);
  const executionOrder = topologicalSort(nodeIds, edges);
  const results: Map<string, NodeExecutionResult> = new Map();

  for (const nodeId of executionOrder) {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) continue;

    // Get input values from previous node outputs
    const inputValues: Record<string, unknown> = {};
    edges
      .filter((e) => e.target === nodeId)
      .forEach((edge) => {
        const sourceResult = results.get(edge.source);
        if (sourceResult) {
          inputValues[edge.sourceHandle ?? "output"] = sourceResult.output;
        }
      });

    // Execute node based on type
    const output = await executeNode(node, inputValues);
    results.set(nodeId, { nodeId, output });
  }

  return Array.from(results.values());
}

async function executeNode(
  node: BaseNode,
  inputs: Record<string, unknown>
): Promise<Record<string, unknown>> {
  switch (node.type) {
    case "seedream":
      return await executeSeedream(node, inputs);
    case "seedance":
      return await executeSeedance(node, inputs);
    case "elevenlabs":
      return await executeElevenlabs(node, inputs);
    case "openrouter":
      return await executeOpenRouter(node, inputs);
    case "crop-image":
      return await executeCropImage(node, inputs);
    case "merge-video":
      return await executeMergeVideo(node, inputs);
    case "extract-audio":
      return await executeExtractAudio(node, inputs);
    default:
      throw new Error(`Unknown node type: ${(node as BaseNode).type}`);
  }
}

// Placeholder functions - will be implemented in node files
async function executeSeedream(
  node: BaseNode,
  inputs: Record<string, unknown>
): Promise<Record<string, unknown>> {
  // Import and call actual implementation
  return { output: "seedream result" };
}

async function executeSeedance(
  node: BaseNode,
  inputs: Record<string, unknown>
): Promise<Record<string, unknown>> {
  return { output: "seedance result" };
}

async function executeElevenlabs(
  node: BaseNode,
  inputs: Record<string, unknown>
): Promise<Record<string, unknown>> {
  return { output: "elevenlabs result" };
}

async function executeOpenRouter(
  node: BaseNode,
  inputs: Record<string, unknown>
): Promise<Record<string, unknown>> {
  return { output: "openrouter result" };
}

async function executeCropImage(
  node: BaseNode,
  inputs: Record<string, unknown>
): Promise<Record<string, unknown>> {
  return { output: "crop-image result" };
}

async function executeMergeVideo(
  node: BaseNode,
  inputs: Record<string, unknown>
): Promise<Record<string, unknown>> {
  return { output: "merge-video result" };
}

async function executeExtractAudio(
  node: BaseNode,
  inputs: Record<string, unknown>
): Promise<Record<string, unknown>> {
  return { output: "extract-audio result" };
}
