export type ExecutionStatus = "pending" | "running" | "completed" | "failed";

export interface ExecutionResult {
  nodeId: string;
  status: ExecutionStatus;
  output?: Record<string, unknown>;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: ExecutionStatus;
  results: ExecutionResult[];
  startedAt: Date;
  completedAt?: Date;
  error?: string;
}
