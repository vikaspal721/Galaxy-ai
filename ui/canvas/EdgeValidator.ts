import { WorkflowEdge } from "@/types/workflow";
import { BaseNode, NodeType } from "@/types/node";

// Define valid connections between node types
const validConnections: Record<NodeType, NodeType[]> = {
  seedream: ["seedance", "crop-image"],
  seedance: ["merge-video", "extract-audio"],
  elevenlabs: ["merge-video"],
  openrouter: ["seedream", "elevenlabs"],
  "crop-image": ["seedance", "merge-video"],
  "merge-video": ["extract-audio"],
  "extract-audio": [],
};

export function canConnect(
  sourceNode: BaseNode,
  targetNode: BaseNode
): { valid: boolean; reason?: string } {
  const sourceType = sourceNode.type;
  const targetType = targetNode.type;

  if (sourceType === targetType) {
    return { valid: false, reason: "Cannot connect node to itself" };
  }

  const allowedTargets = validConnections[sourceType];
  if (!allowedTargets.includes(targetType)) {
    return {
      valid: false,
      reason: `Cannot connect ${sourceType} to ${targetType}`,
    };
  }

  return { valid: true };
}

export function validateEdge(
  edge: WorkflowEdge,
  nodes: BaseNode[]
): { valid: boolean; reason?: string } {
  const sourceNode = nodes.find((n) => n.id === edge.source);
  const targetNode = nodes.find((n) => n.id === edge.target);

  if (!sourceNode || !targetNode) {
    return { valid: false, reason: "Source or target node not found" };
  }

  return canConnect(sourceNode, targetNode);
}

export function validateWorkflow(
  nodes: BaseNode[],
  edges: WorkflowEdge[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  edges.forEach((edge) => {
    const validation = validateEdge(edge, nodes);
    if (!validation.valid) {
      errors.push(`Edge ${edge.id}: ${validation.reason}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
