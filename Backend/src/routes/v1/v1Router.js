import express from 'express';

import userRouter from './userRoutes.js';
import workspaceRouter from './workspaceRoutes.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);

export default router;
