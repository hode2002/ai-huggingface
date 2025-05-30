import { Request, Response } from 'express';
import axios from 'axios';
import { enhanceImage } from '../services/enhance.service.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     EnhanceRequest:
 *       type: object
 *       required:
 *         - image
 *       properties:
 *         image:
 *           type: string
 *           description: URL of the image to enhance
 *         size:
 *           type: string
 *           enum: [2x, 4x, 8x]
 *           description: Enhancement size multiplier
 *           default: 2x
 *     EnhanceResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Whether the operation was successful
 *         data:
 *           type: object
 *           properties:
 *             enhancedImageUrl:
 *               type: string
 *               description: URL of the enhanced image
 *         error:
 *           type: string
 *           description: Error message if the operation failed
 */

interface EnhanceRequest {
  image: string; 
  size?: "2x" | "4x" | "8x";
}

/**
 * @swagger
 * /enhance:
 *   post:
 *     summary: Enhance an image using AI
 *     description: Enhances the quality of an image using AI technology
 *     tags: [Image Enhancement]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnhanceRequest'
 *     responses:
 *       200:
 *         description: Image enhanced successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnhanceResponse'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnhanceResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnhanceResponse'
 */
export async function enhanceImageController(req: Request, res: Response): Promise<void> {
  try {
    const { image, size } = req.body as EnhanceRequest;
    console.log('Enhancing image: ', image, ' size: ', size)

    if (!image) { 
      res.status(400).json({
        success: false,
        error: "Image URL is required"
      });
      return;
    }

    const imageResponse = await axios.get(image, {
      responseType: 'arraybuffer'
    });

    if (imageResponse.status !== 200) {
      res.status(400).json({
        success: false,
        error: "Failed to fetch image from the provided URL"
      });
      return;
    }

    const imageBlob = new Blob([imageResponse.data], {
      type: imageResponse.headers['content-type'] || 'image/jpeg'
    });

    const result = await enhanceImage({
      image: imageBlob,
      size: size || "2x"
    });

    if (result.error) {
      res.status(500).json({
        success: false,
        error: result.error
      });
      return;
    }

    console.log('Image enhance successfully:', image, ' size:', size)

    res.json({
      success: true,
      data: {
        enhancedImageUrl: result.data
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