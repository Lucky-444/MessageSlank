import express from 'express';

import { isMemberPartOfTheWorkspaceController } from '../../controllers/memberController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
const router = express.Router();

//pass from req.body --> x-access-token
//params = workspaceId;
router.get(
  '/:workspaceId',
  isAuthenticated,
  isMemberPartOfTheWorkspaceController
);

export default router;
