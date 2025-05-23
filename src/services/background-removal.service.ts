import { Client } from '@gradio/client';
import { BackgroundRemovalOptions, BackgroundRemovalResult, GradioResponse } from '../interfaces/background-removal.interface.js';
import axios from 'axios';

export async function removeBackground(options: BackgroundRemovalOptions): Promise<BackgroundRemovalResult> {
    try {
        const backgroundRemovalSpace = process.env.BACKGROUND_REMOVAL_SPACE;
        if (!backgroundRemovalSpace) {
            throw new Error("BACKGROUND_REMOVAL_SPACE environment variable is not set");
        }

        const response = await axios.get(options.imageUrl, { responseType: 'arraybuffer' });
        const imageBlob = new Blob([response.data]);

        const client = await Client.connect(backgroundRemovalSpace);
        const result = await client.predict('/image', {
            image: imageBlob
        }) as unknown as GradioResponse;

        if (!result.data || result.data.length === 0) {
            throw new Error('No result data received from background removal service');
        }

        return {
            processedImageUrl: result.data[0][0].url as string
        };
    } catch (error) {
        console.error('Error removing background:', error);
        throw new Error(`Failed to remove background: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
} 