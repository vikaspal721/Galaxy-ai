import { task } from "@trigger.dev/sdk/v3";
import { generateImage } from "@/lib/providers/fal";
import { BaseNode } from "@/types/node";

export const seedreamTask = task({
  id: "seedream",
  run: async (payload: { node: BaseNode; inputs: Record<string, unknown> }) => {
    const { node, inputs } = payload;
    const prompt = (inputs.prompt as string) || (node.data.prompt as string) || "";

    const result = await generateImage({
      prompt,
      model: (node.data.model as string) ?? "seedream-xl",
      width: (node.data.width as number) ?? 1024,
      height: (node.data.height as number) ?? 1024,
    });

    return {
      output: result,
      imageUrl: result.images?.[0]?.url ?? result.url,
    };
  },
});
