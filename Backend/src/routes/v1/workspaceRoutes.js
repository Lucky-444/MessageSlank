import express from 'express';

import {
  createWorkspaceController,
  getWorkspaceUserIsMemberOfController
} from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { workspaceSchema } from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

// pass from req.body ==> {
//  x-www-form-urlencoded
//   name : Test,
// in header send the token the login token
//which is came after signin or login
// }

router.post(
  '/',
  isAuthenticated,
  validate(workspaceSchema),
  createWorkspaceController
);

// pass from req.body ==> {
// userId -> in body
//
//
// }

router.get('/', isAuthenticated, getWorkspaceUserIsMemberOfController);

export default router;
