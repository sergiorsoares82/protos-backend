import cors from 'cors';

import express, { type Request, type Response } from 'express';
import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import router from './routes/api/v1/index.js';

const env = dotenv.config();
dotenvExpand.expand(env);

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

console.log('Novo commit');

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!');
});

// Global catch-all 404 handler for all other routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found in application' });
});

// Global error handler (optional, for unexpected errors)
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
