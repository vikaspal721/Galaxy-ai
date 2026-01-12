import { z } from "zod";

export type NodeType =
  | "seedream"
  | "seedance"
  | "elevenlabs"
  | "openrouter"
  | "crop-image"
  | "merge-video"
  | "extract-audio";

export type NodeStatus = "idle" | "running" | "completed" | "error";

export interface BaseNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: Record<string, unknown>;
  status?: NodeStatus;
}

export interface NodeInput {
  nodeId: string;
  port: string;
  value: unknown;
}

export interface NodeOutput {
  nodeId: string;
  port: string;
  value: unknown;
}
