import { Request, Response } from 'express';
import { TextGenerateOptions } from '../interfaces/text-generator.interface.js';
import { generateText } from '../services/text-generator.service.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     TextGenerateRequest:
 *       type: object
 *       required:
 *         - prompt
 *       properties:
 *         prompt:
 *           type: string
 *           description: Text prompt for generation
 *         maxLength:
 *           type: integer
 *           description: Maximum length of generated text
 *           default: 50
 *     TextGenerateResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Whether the operation was successful
 *         data:
 *           type: object
 *           properties:
 *             prompt:
 *               type: string
 *               description: Generated text
 *         error:
 *           type: string
 *           description: Error message if the operation failed
 */

/**
 * @swagger
 * /text:
 *   post:
 *     summary: Generate text using AI
 *     description: Generates text based on a prompt using AI technology
 *     tags: [Text Generation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextGenerateRequest'
 *     responses:
 *       200:
 *         description: Text generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TextGenerateResponse'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TextGenerateResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TextGenerateResponse'
 */
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