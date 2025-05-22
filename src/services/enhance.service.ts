import { client } from "@gradio/client";
import dotenv from 'dotenv';
import { EnhanceOptions, EnhanceResult, GradioResponse } from "../interfaces/enhance.interface";

dotenv.config();

export async function enhanceImage(options: EnhanceOptions): Promise<EnhanceResult> {
  try {
    const spaceUrl = process.env.GRADIO_SPACE_URL;
    if (!spaceUrl) {
      throw new Error("GRADIO_SPACE_URL environment variable is not set");
    }

    const clientInstance = await client(spaceUrl);
 
    const result = await clientInstance.predict(0, [
      options.image,
      options.size || "2x"
    ]) as unknown as GradioResponse;

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