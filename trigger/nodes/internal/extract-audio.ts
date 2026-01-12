import { task } from "@trigger.dev/sdk/v3";
import { BaseNode } from "@/types/node";

export const extractAudioTask = task({
  id: "extract-audio",
  run: async (payload: { node: BaseNode; inputs: Record<string, unknown> }) => {
    const { node, inputs } = payload;
    const videoUrl = (inputs.videoUrl as string) || (inputs.video as string) || "";

    // In a real implementation, you'd use FFmpeg to extract audio
    // For now, return a placeholder
    return {
      output: {
        videoUrl,
        extracted: true,
      },
      audioUrl: videoUrl.replace(/\.(mp4|mov|avi)$/, ".mp3"),
    };
  },
});
