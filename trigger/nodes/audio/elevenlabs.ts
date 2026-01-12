import { task } from "@trigger.dev/sdk/v3";
import { BaseNode } from "@/types/node";

export const elevenlabsTask = task({
  id: "elevenlabs",
  run: async (payload: { node: BaseNode; inputs: Record<string, unknown> }) => {
    const { node, inputs } = payload;
    const text = (inputs.text as string) || (node.data.text as string) || "";
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      throw new Error("ELEVENLABS_API_KEY not configured");
    }

    const voiceId = (node.data.voiceId as string) || "21m00Tcm4TlvDq8ikWAM";

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: (node.data.model as string) ?? "eleven_monolingual_v1",
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    // In a real implementation, you'd upload this to storage and return the URL
    const audioUrl = `data:audio/mpeg;base64,${Buffer.from(audioBuffer).toString("base64")}`;

    return {
      output: { audioUrl },
      audioUrl,
    };
  },
});
