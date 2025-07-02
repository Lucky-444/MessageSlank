import express from 'express';

import { getMessagesController } from '../../controllers/messageController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

/* 
req.body || req.params => 
the workspaceId, channelId,
 */

router.get('/:channelId', isAuthenticated, getMessagesController);

export default router;
