import express from 'express';
import prisma from '../../../infra/database';

const statusRoutes = express.Router();

statusRoutes.get('/status', async (req, res) => {
  const updated_at = new Date().toISOString();

  const databaseVersionResult = await prisma.$queryRaw<
    { server_version: string }[]
  >`SHOW server_version;`;
  const databaseVersionValue = databaseVersionResult[0]?.server_version;

  const databaseMaxConnectionsResult = await prisma.$queryRaw<
    { max_connections: number }[]
  >`SHOW max_connections;`;
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult[0]?.max_connections;
  const databaseOpenedConnectionsResult = await prisma.$queryRaw<
    { opened_connections: number }[]
  >`SELECT count(*) as opened_connections FROM pg_stat_activity;`;
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult[0]?.opened_connections;
  res.json({
    updated_at,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: Number(databaseMaxConnectionsValue), // Example value, replace with actual query if needed
        opened_connections: Number(databaseOpenedConnectionsValue), // Example value, replace with actual query if needed
      },
    },
  });

  prisma.$disconnect();
});

export default statusRoutes;
