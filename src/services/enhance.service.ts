import { EnhanceOptions, EnhanceResult, GradioResponse } from "../interfaces/enhance.interface";
import { Client } from "@gradio/client";

export async function enhanceImage(options: EnhanceOptions): Promise<EnhanceResult> {
  try {
      const realEsrganSpace = process.env.REAL_ESRGAN_SPACE;
      if (!realEsrganSpace) {
        throw new Error("REAL_ESRGAN_SPACE environment variable is not set");
      }

      const client = await Client.connect(realEsrganSpace);
      const result = await client.predict("/predict", {
          image: options.image,
          size: options.size || "2x"
      }) as unknown as GradioResponse;

    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
      console.error("Invalid result structure:", result);
      throw new Error("No enhanced image data received");
    }

    const enhancedImageUrl = result.data[0].url;
    if (!enhancedImageUrl) {
      throw new Error("No enhanced image URL received");
    }

    return {
      data: enhancedImageUrl
    };
  } catch (error) {
    console.error("Error enhancing image:", error);
    return {
      data: "",
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}