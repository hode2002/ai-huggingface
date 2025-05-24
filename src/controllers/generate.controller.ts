import { Request, Response } from 'express';
import { fluxDev, fluxPro,  } from '../services/generate.service.js';
import { ModelName } from '../types/model.type.js';
import translate from '../services/translate.service.js';

const models = {
  'fluxDev': fluxDev,
  'fluxPro': fluxPro 
} as const;

export async function generateImageController(req: Request, res: Response): Promise<void> {
  try {
      const modelName = (req.query.model as ModelName) || 'fluxDev';

      const options: any = req.body;
      console.log('Generating image with options: ', JSON.stringify(options), ' model: ', modelName)
    
      if (!options.prompt) {
        res.status(400).json({
          success: false,
          error: "Prompt is required"
        });
        return;
      }

      const prompt = await translate(options.prompt)
      options.prompt = prompt
      const result = await models[modelName](options)

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