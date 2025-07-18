import express from 'express';

import {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  createWorkspaceController,
  deleteWorkspaceController,
  getWorkspaceByJoinCodeController,
  getWorkspaceController,
  getWorkspaceUserIsMemberOfController,
  joinWorkspaceController,
  resetWorkspaceJoincodeController,
  updateWorkspaceController
} from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import {
  addChannelToWorkspaceSchema,
  addMemberToWorkspaceSchema,
  workspaceSchema
} from '../../validators/workspaceSchema.js';
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

//pass from req.params ==> {
// mongo joincode
//and header -> pass x-access-token
// }
router.get(
  '/join/:joinCode',
  isAuthenticated,
  getWorkspaceByJoinCodeController
);

//pass from req.params ==>{
//mongo WorkspaceId,
//and joinCode also
//userId
//and header -> pass x-access-token
// }

router.put('/:workspaceId/join', isAuthenticated, joinWorkspaceController);

//pass from req.params ==>{
//mongo WorkspaceId
//and header -> pass x-access-token
// }
router.put('/:workspaceId', isAuthenticated, updateWorkspaceController);

//pass from req.params ==>{
//mongo WorkspaceId
//and header -> pass x-access-token
//req.body ==> {
// memberId =
//role =
// }
// }
router.put(
  '/:workspaceId/members',
  isAuthenticated,
  validate(addMemberToWorkspaceSchema),
  addMemberToWorkspaceController
);

//pass from req.params ==>{
//mongo WorkspaceId
//and header -> pass x-access-token
//req.body ==> {
//channelName =
// }
// }

router.put(
  '/:workspaceId/channels',
  isAuthenticated,
  validate(addChannelToWorkspaceSchema),
  addChannelToWorkspaceController
);

//pass from req.params ==>{
//mongo WorkspaceId
//and header -> pass x-access-token
// }

router.put(
  '/:workspaceId/joinCode/reset',
  isAuthenticated,
  resetWorkspaceJoincodeController
);

//pass from req.params ==>{
//mongo WorkspaceId,
//and joinCode also
//userId
//and header -> pass x-access-token
// }

export default router;
