import { BaseNode } from "./node";

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: BaseNode[];
  edges: WorkflowEdge[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: "pending" | "running" | "completed" | "failed";
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  results?: Record<string, unknown>;
}
