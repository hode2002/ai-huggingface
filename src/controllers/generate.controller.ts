import { Request, Response } from 'express';
import { generateImage } from '../services/generate.service.js';
import { GenerateOptions } from '../interfaces/generate.interface.js';

export async function generateImageController(req: Request, res: Response): Promise<void> {
    const options: GenerateOptions = req.body;
    console.log('Generating image with options: ', JSON.stringify(options))
  
    try {
      if (!options.prompt) {
        res.status(400).json({
          success: false,
          error: "Prompt is required"
        });
        return;
      }

      const result = await generateImage(options);

      if (result.error) {
        res.status(500).json({
          success: false,
          error: result.error
        });
        return;
      }

      console.log('Image generated successfully for prompt:', options.prompt);

      res.json({
        success: true,
        data: {
          generatedImageUrl: result.data
        }
      });
    } catch (error) {
      console.error("Error in generate controller:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred"
      });
    }
} 