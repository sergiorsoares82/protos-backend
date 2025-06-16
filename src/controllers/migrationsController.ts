import { exec } from 'child_process';
import { promisify } from 'util';
import { PrismaClient } from '../generated/prisma';
import { resolve } from 'path';
import { readdirSync } from 'fs';

const execAsync = promisify(exec);
const prisma = new PrismaClient();

async function listPendingMigrations() {
  const applied = await prisma.$queryRaw<
    { migration_name: string }[]
  >`SELECT migration_name FROM "_prisma_migrations"`;

  const appliedNames = new Set(applied.map((m) => m.migration_name));

  const migrationDir = resolve('prisma', 'migrations');
  const allMigrationDirs = readdirSync(migrationDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((dir) => dir.name);

  const pending = allMigrationDirs.filter((name) => !appliedNames.has(name));
  return pending;
}

async function runPendingMigrations() {
  await execAsync('npx prisma migrate deploy');
  return listPendingMigrations(); // Depois de aplicar, deve retornar []
}

const migrationsController = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrationsController;
