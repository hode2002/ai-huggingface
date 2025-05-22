import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { enhanceImageController } from './controllers/enhance.controller.js';

const app = express();
const port = process.env.PORT || 3002;

const corsOptions = {
  origin: process.env.ALLOW_ORIGINS,
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());

app.post('/enhance', enhanceImageController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 