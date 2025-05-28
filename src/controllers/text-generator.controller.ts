import { Request, Response } from 'express';
import { TextGenerateOptions } from '../interfaces/text-generator.interface.js';
import { generateText } from '../services/text-generator.service.js';

export async function textGeneratorController(req: Request, res: Response): Promise<void> {
  try {
    const { prompt, maxLength } = req.body as TextGenerateOptions;
    console.log('Generating for: ', prompt, ' maxLength: ', maxLength)

    if (!prompt) {
      res.status(400).json({
        success: false,
        error: "Prompt is required"
      });
      return;
    }

    const result = await generateText({
      prompt,
      maxLength
    });

    if (result.error) {
      res.status(500).json({
        success: false,
        error: result.error
      });
      return;
    }

    console.log('Text generated successfully:', prompt, ' maxLength:', maxLength ?? 50)

    res.json({
      success: true,
      data: {
        prompt: result.data
      }
    });
  } catch (error) {
    console.error("Error in enhance controller:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred"
    });
  }
} 