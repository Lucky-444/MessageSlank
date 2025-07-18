import express from 'express';

import { getChannelByIdController } from '../../controllers/channelController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();
///just the user is sign in

router.get('/:channelId', isAuthenticated, getChannelByIdController);

export default router;
