import { Client } from "@gradio/client";
import { GradioResponse, TextGenerateOptions,TextGenerateResult } from "../interfaces/text-generator.interface.js";

export async function generateText(options: TextGenerateOptions): Promise<TextGenerateResult> {
  try {
      const textGeneratorSpace = process.env.TEXT_GENERATOR_SPACE;
      if (!textGeneratorSpace) {
        throw new Error("TEXT_GENERATOR_SPACE environment variable is not set");
      }

      const client = await Client.connect(textGeneratorSpace);
      const result = await client.predict("/predict", {
          prompt: options.prompt,
          max_length: options.maxLength || 50
      }) as unknown as GradioResponse;

    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
      console.error("Invalid result structure:", result);
      throw new Error("No enhanced image data received");
    }
    
    return {
      data: result.data[0]
    };
  } catch (error) {
    console.error("Error generating prompt:", error);
    return {
      data: "",
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}