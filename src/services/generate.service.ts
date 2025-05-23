import { GenerateOptions, GenerateResult, GradioResponse } from "../interfaces/generate.interface";
import { Client } from "@gradio/client";

export async function generateImage(options: GenerateOptions): Promise<GenerateResult> {
  try {
    const fluxSpace = process.env.FLUX_SPACE;
    if (!fluxSpace) {
      throw new Error("FLUX_SPACE environment variable is not set");
    }

    const client = await Client.connect(fluxSpace);
    const result = await client.predict("/infer", {
        prompt:options.prompt,
        seed: options.seed || 0,
        randomize_seed: options.randomizeSeed || true,
        width: options.width || 1024,
        height: options.height || 1024,
        guidance_scale: options.guidanceScale || 3.5,
        num_inference_steps: options.numInferenceSteps || 28,
    }) as unknown as GradioResponse;

    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
      console.error("Invalid result structure:", result);
      throw new Error("No generated image data received");
    }

    console.log(result.data)

    const generatedImageUrl = result.data[0].url;
    if (!generatedImageUrl) {
      throw new Error("No generated image URL received");
    }

    return {
      data: generatedImageUrl
    };
  } catch (error) {
    console.error("Error generating image:", error);
    return {
      data: "",
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
} 