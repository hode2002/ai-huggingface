import { Request, Response } from 'express';
import { removeBackground } from '../services/background-removal.service.js';

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