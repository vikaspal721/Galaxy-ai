// fal.ai API wrapper

export interface FalImageRequest {
  prompt: string;
  model?: string;
  width?: number;
  height?: number;
}

export interface FalVideoRequest {
  imageUrl: string;
  prompt?: string;
  duration?: number;
}

export async function generateImage(request: FalImageRequest) {
  const apiKey = process.env.FAL_API_KEY;
  if (!apiKey) {
    throw new Error("FAL_API_KEY not configured");
  }

  const response = await fetch("https://fal.run/fal-ai/seedream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Key ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: request.prompt,
      model: request.model ?? "seedream-xl",
      width: request.width ?? 1024,
      height: request.height ?? 1024,
    }),
  });

  if (!response.ok) {
    throw new Error(`fal.ai API error: ${response.statusText}`);
  }

  return response.json();
}

export async function generateVideo(request: FalVideoRequest) {
  const apiKey = process.env.FAL_API_KEY;
  if (!apiKey) {
    throw new Error("FAL_API_KEY not configured");
  }

  const response = await fetch("https://fal.run/fal-ai/seedance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Key ${apiKey}`,
    },
    body: JSON.stringify({
      image_url: request.imageUrl,
      prompt: request.prompt,
      duration: request.duration ?? 5,
    }),
  });

  if (!response.ok) {
    throw new Error(`fal.ai API error: ${response.statusText}`);
  }

  return response.json();
}
