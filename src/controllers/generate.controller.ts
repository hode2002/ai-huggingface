import { Request, Response } from 'express';
import { fluxDev, fluxPro,  } from '../services/generate.service.js';
import { ModelName } from '../types/model.type.js';
import translate from '../services/translate.service.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     GenerateRequest:
 *       type: object
 *       required:
 *         - prompt
 *       properties:
 *         prompt:
 *           type: string
 *           description: Text prompt for image generation
 *         negative_prompt:
 *           type: string
 *           description: Negative prompt to avoid certain elements
 *         num_inference_steps:
 *           type: integer
 *           description: Number of inference steps
 *         guidance_scale:
 *           type: number
 *           description: Guidance scale for generation
 *     GenerateResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Whether the operation was successful
 *         data:
 *           type: object
 *           properties:
 *             generatedImageUrl:
 *               type: string
 *               description: URL of the generated image
 *         error:
 *           type: string
 *           description: Error message if the operation failed
 */

const models = {
  'fluxDev': fluxDev,
  'fluxPro': fluxPro 
} as const;

/**
 * @swagger
 * /generate:
 *   post:
 *     summary: Generate an image using AI
 *     description: Generates an image based on a text prompt using AI technology
 *     tags: [Image Generation]
 *     parameters:
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *           enum: [fluxDev, fluxPro]
 *         description: Model to use for generation
 *         default: fluxDev
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenerateRequest'
 *     responses:
 *       200:
 *         description: Image generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenerateResponse'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenerateResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenerateResponse'
 */
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