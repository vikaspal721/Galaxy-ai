import { task } from "@trigger.dev/sdk/v3";
import { chatCompletion } from "@/lib/providers/openrouter";
import { BaseNode } from "@/types/node";

export const openrouterTask = task({
  id: "openrouter",
  run: async (payload: { node: BaseNode; inputs: Record<string, unknown> }) => {
    const { node, inputs } = payload;
    const prompt = (inputs.prompt as string) || (node.data.prompt as string) || "";

    const result = await chatCompletion({
      model: (node.data.model as string) || "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: (node.data.systemPrompt as string) || "You are a helpful assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: (node.data.temperature as number) ?? 0.7,
      max_tokens: (node.data.maxTokens as number) ?? 1000,
    });

    return {
      output: { text: result },
      text: result,
    };
  },
});
