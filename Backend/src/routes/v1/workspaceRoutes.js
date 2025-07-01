import express from 'express';

import {
  createWorkspaceController,
  deleteWorkspaceController,
  getWorkspaceController,
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
// mongo WorkspaceId
// }

router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

//pass from req.params ==> {
// mongo WorkspaceId
// }

router.get('/:workspaceId', isAuthenticated, getWorkspaceController);

export default router;
