import { z } from "zod";
import { baseNodeSchema } from "./nodeSchemas";

export const workflowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  sourceHandle: z.string().optional(),
  targetHandle: z.string().optional(),
});

export const workflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  nodes: z.array(baseNodeSchema),
  edges: z.array(workflowEdgeSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
});

export const createWorkflowSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  nodes: z.array(baseNodeSchema),
  edges: z.array(workflowEdgeSchema),
});

export const updateWorkflowSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  nodes: z.array(baseNodeSchema).optional(),
  edges: z.array(workflowEdgeSchema).optional(),
});
