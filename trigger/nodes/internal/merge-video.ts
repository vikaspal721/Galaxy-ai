import { task } from "@trigger.dev/sdk/v3";
import { BaseNode } from "@/types/node";

export const mergeVideoTask = task({
  id: "merge-video",
  run: async (payload: { node: BaseNode; inputs: Record<string, unknown> }) => {
    const { node, inputs } = payload;
    const videoUrls = (inputs.videoUrls as string[]) || (inputs.videos as string[]) || [];

    // In a real implementation, you'd use FFmpeg to merge videos
    // For now, return a placeholder
    return {
      output: {
        videoUrls,
        merged: true,
      },
      videoUrl: videoUrls[0] ?? "",
    };
  },
});
