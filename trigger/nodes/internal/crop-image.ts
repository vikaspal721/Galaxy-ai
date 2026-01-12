import { task } from "@trigger.dev/sdk/v3";
import { BaseNode } from "@/types/node";

export const cropImageTask = task({
  id: "crop-image",
  run: async (payload: { node: BaseNode; inputs: Record<string, unknown> }) => {
    const { node, inputs } = payload;
    const imageUrl = (inputs.imageUrl as string) || (inputs.image as string) || "";
    const x = (node.data.x as number) ?? 0;
    const y = (node.data.y as number) ?? 0;
    const width = (node.data.width as number) ?? 100;
    const height = (node.data.height as number) ?? 100;

    // In a real implementation, you'd use an image processing library
    // like Sharp to crop the image
    // For now, return a placeholder
    return {
      output: {
        imageUrl,
        crop: { x, y, width, height },
      },
      imageUrl: `${imageUrl}?crop=${x},${y},${width},${height}`,
    };
  },
});
