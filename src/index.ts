import PrismaPkg from './generated/prisma/client.js';
const { PrismaClient } = PrismaPkg;

import express from 'express';
import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config();
dotenvExpand.expand(env);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

console.log('Novo commit');

app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!');
});

app.get('/status', async (req, res) => {
  const prisma = new PrismaClient({
    log: ['error'],
    errorFormat: 'pretty',
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
  const version = await prisma.$queryRaw<
    { server_version: string }[]
  >`SHOW server_version;`;
  res.json({
    status: 'OK',
    version: version[0]?.server_version || 'unknown',
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
