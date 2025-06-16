import express from 'express';
import statusRoutes from './statusRoutes';
import migrationRoutes from './migrationRoutes';

const apiV1router = express.Router();

apiV1router.use('/status', statusRoutes);
apiV1router.use('/migrations', migrationRoutes);

export default apiV1router;
