import { task } from "@trigger.dev/sdk/v3";
import { generateVideo } from "@/lib/providers/fal";
import { BaseNode } from "@/types/node";

export const seedanceTask = task({
  id: "seedance",
  run: async (payload: { node: BaseNode; inputs: Record<string, unknown> }) => {
    const { node, inputs } = payload;
    const imageUrl =
      (inputs.imageUrl as string) ||
      (inputs.image as string) ||
      (node.data.imageUrl as string) ||
      "";

    const result = await generateVideo({
      imageUrl,
      prompt: (inputs.prompt as string) || (node.data.prompt as string),
      duration: (node.data.duration as number) ?? 5,
    });

    return {
      output: result,
      videoUrl: result.video?.url ?? result.url,
    };
  },
});
