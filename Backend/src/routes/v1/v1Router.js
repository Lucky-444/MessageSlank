import express from 'express';

import channelRouter from './channelRoutes.js';
import memberRouter from './memberRoute.js';
import messageRouter from './messagesRoutes.js';
import userRouter from './userRoutes.js';
import workspaceRouter from './workspaceRoutes.js';
const router = express.Router();

router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);
router.use('/channels', channelRouter);
router.use('/members', memberRouter);
router.use('/message', messageRouter);

export default router;
