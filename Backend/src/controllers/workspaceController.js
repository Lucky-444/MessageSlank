import { StatusCodes } from 'http-status-codes';

import { createWorkspaceService } from '../services/workspaceService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObject.js';

export const createWorkspaceController = async (req, res) => {
  try {
    const workspace = await createWorkspaceService({
      ...req.body,
      owner: req.user
    });
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(workspace, 'Workspace Created SuccessFully'));
  } catch (error) {
    console.log('Workspace Controller Error', error);
    if (error.statusCode) {
      return res
        .status(error.statusCode)
        .json(customErrorResponse(error, error.message));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error, error.message));
  }
};

// export const getWorkspaceController = async (req, res) => {
//   try {
//     const workspace = await createWorkspaceService({
//       ...req.body,
//       owner: req.user
//     });
//     return res
//       .status(StatusCodes.CREATED)
//       .json(successResponse(workspace, 'Workspace Created SuccessFully'));
//   } catch (error) {
//     console.log('Workspace Controller Error', error);
//     if (error.statusCode) {
//       return res.status(error.statusCode).json(customErrorResponse(error));
//     }
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json(internalErrorResponse(error));
//   }
// };
