import { PrismaClient } from './generated/prisma/client';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!');
});

app.get('/status', async (req, res) => {
  const prisma = new PrismaClient();
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
