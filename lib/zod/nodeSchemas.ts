import { z } from "zod";

export const nodeInputSchema = z.object({
  nodeId: z.string(),
  port: z.string(),
  value: z.unknown(),
});

export const nodeOutputSchema = z.object({
  nodeId: z.string(),
  port: z.string(),
  value: z.unknown(),
});

export const baseNodeSchema = z.object({
  id: z.string(),
  type: z.enum([
    "seedream",
    "seedance",
    "elevenlabs",
    "openrouter",
    "crop-image",
    "merge-video",
    "extract-audio",
  ]),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.record(z.unknown()),
  status: z.enum(["idle", "running", "completed", "error"]).optional(),
});
