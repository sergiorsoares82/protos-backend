import express from 'express';
import migrationsController from '../../../controllers/migrationsController';
const migrationRoutes = express.Router();

migrationRoutes.get('/', async (req, res, next) => {
  try {
    const result = await migrationsController.listPendingMigrations();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default migrationRoutes;
