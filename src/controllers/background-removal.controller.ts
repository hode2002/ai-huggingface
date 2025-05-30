import { Request, Response } from 'express';
import { removeBackground } from '../services/background-removal.service.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     BackgroundRemovalRequest:
 *       type: object
 *       required:
 *         - imageUrl
 *       properties:
 *         imageUrl:
 *           type: string
 *           description: URL of the image to remove background from
 *     BackgroundRemovalResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Whether the operation was successful
 *         data:
 *           type: object
 *           properties:
 *             imageUrl:
 *               type: string
 *               description: URL of the image with background removed
 *         error:
 *           type: string
 *           description: Error message if the operation failed
 */

/**
 * @swagger
 * /remove-background:
 *   post:
 *     summary: Remove background from an image
 *     description: Removes the background from an image using AI technology
 *     tags: [Background Removal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BackgroundRemovalRequest'
 *     responses:
 *       200:
 *         description: Background removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BackgroundRemovalResponse'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BackgroundRemovalResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BackgroundRemovalResponse'
 */
export async function removeBackgroundController(req: Request, res: Response): Promise<void> {
    try {
        const { imageUrl } = req.body;
        console.log('Removing background for image: ', imageUrl)

        if (!imageUrl) {
            res.status(400).json({
                success: false,
                error: 'Image URL is required'
            });
            return;
        }

        const result = await removeBackground({ imageUrl });

        console.log('Remove background successfully: ', imageUrl)

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error in background removal controller:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to remove background'
        });
    }
} 