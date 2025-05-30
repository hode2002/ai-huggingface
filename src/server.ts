import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { enhanceImageController } from './controllers/enhance.controller.js';
import { generateImageController } from './controllers/generate.controller.js';
import { removeBackgroundController } from './controllers/background-removal.controller.js';
import { textGeneratorController } from './controllers/text-generator.controller.js';
import { swaggerSpec } from './config/swagger.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;


const allowedOrigins = process.env.ALLOW_ORIGINS;

const corsOptions = {
    origin: (
        origin: string | undefined, 
        callback: (error: Error | null, allow?: boolean) => void,
    ) => {
        if ((allowedOrigins && allowedOrigins.includes(origin)) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'POST',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.post('/enhance', enhanceImageController);
app.post('/generate', generateImageController);
app.post('/remove-background', removeBackgroundController);
app.post('/text', textGeneratorController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/docs`);
});
