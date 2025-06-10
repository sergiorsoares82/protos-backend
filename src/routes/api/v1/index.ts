import express from 'express';
import statusRoutes from './statusRoutes';

const apiV1router = express.Router();

apiV1router.use(statusRoutes);

export default apiV1router;
