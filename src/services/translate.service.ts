import { v2 } from '@google-cloud/translate';
import { franc } from "franc";
import dotenv from 'dotenv';

dotenv.config();

const translateClient = new v2.Translate({
    key: process.env.GOOGLE_API_KEY,
    projectId: process.env.GOOGLE_CLIENT_ID,
});

const translate = async (text: string): Promise<string> => {
    try {
        const langCode = franc(text);
    
        if (langCode === "vie") {
            console.log('Translate to English:', text)
            const [translated] = await translateClient.translate(text, 'en');
            text = translated;
        }
    
        return text
    } catch (error) {
        console.log('Failed to translate:', error)
        return text
    }
}

export default translate