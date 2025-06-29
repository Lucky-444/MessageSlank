import express from 'express';

import {
  createWorkspaceController,
  deleteWorkspaceController,
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
// always loggedin
// in header always send the x-access-token
//that is came after login
// }

router.get('/', isAuthenticated, getWorkspaceUserIsMemberOfController);

//pass from req.params ==> {
//
// }

router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

export default router;
