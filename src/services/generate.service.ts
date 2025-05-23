import { IFluxDevOptions, GenerateResult, GradioResponse, IFluxProOptions } from "../interfaces/generate.interface";
import { Client } from "@gradio/client";

type ServerChoiceKey = 'google_us' | 'azure_lite' | 'artemis_gpu' | 'nebula_tensor' | 'pixel_npu';

const SERVER_CHOICES: Record<ServerChoiceKey, string> = {
  google_us: 'Google US Server',
  azure_lite: 'Azure Lite Supercomputer Server',
  artemis_gpu: 'Artemis GPU Super cluster',
  nebula_tensor: 'NebulaDrive Tensor Server',
  pixel_npu: 'PixelNet NPU Server',
} as const;

export const fluxDev = async (options: IFluxDevOptions) : Promise<GenerateResult> => {
  try {
    const fluxDevSpace = process.env.FLUX_DEV_SPACE;
    if (!fluxDevSpace) {
      throw new Error("FLUX_DEV_SPACE environment variable is not set");
    }

    const client = await Client.connect(fluxDevSpace);
    const result = await client.predict("/infer", {
        prompt:options.prompt,
        seed: options.seed || 0,
        randomize_seed: options.randomize || true,
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

export const fluxPro = async (options: IFluxProOptions): Promise<GenerateResult> => {
  try {
    const fluxProSpace = process.env.FLUX_PRO_SPACE;
    if (!fluxProSpace) {
      throw new Error("FLUX_PRO_SPACE environment variable is not set");
    }

    const client = await Client.connect(fluxProSpace);

    const serverChoice = SERVER_CHOICES[(options?.serverChoice || 'google_us') as ServerChoiceKey];
    const result = await client.predict("/generate_image", {
        prompt: options.prompt,
        seed: options.seed || 0,
        randomize: options.randomize || true,
        width: options.width || 1024,
        height: options.height || 1024,
        server_choice: serverChoice,
    }) as unknown as GradioResponse;

    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
      console.error("Invalid result structure:", result);
      throw new Error("No generated image data received");
    }

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