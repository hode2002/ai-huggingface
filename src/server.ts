import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { enhanceImageController } from './controllers/enhance.controller.js';
import { generateImageController } from './controllers/generate.controller.js';
import { removeBackgroundController } from './controllers/background-removal.controller.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

const allowedOrigins = process.env.ALLOW_ORIGINS?.split(',').map(origin => origin.trim()) || [];
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());

app.post('/enhance', enhanceImageController);
app.post('/generate', generateImageController);
app.post('/remove-background', removeBackgroundController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 