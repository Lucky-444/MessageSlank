import { StatusCodes } from 'http-status-codes';

import {
  addChannelToWorkspaceService,
  addMemberToWorkspaceService,
  createWorkspaceService,
  deleteWorkspaceService,
  getWorkspaceByJoinCodeService,
  getWorkspaceService,
  getWorkspaceUserIsMemberOfService,
  updateWorkspaceService
} from '../services/workspaceService.js';
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

export const getWorkspaceUserIsMemberOfController = async (req, res) => {
  try {
    const response = await getWorkspaceUserIsMemberOfService(req.user);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Workspace Fetched SuccessFully'));
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

export const deleteWorkspaceController = async (req, res) => {
  try {
    const workspace = await deleteWorkspaceService(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(workspace, 'Workspace Deleted SuccessFully'));
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

export const getWorkspaceController = async (req, res) => {
  try {
    const response = await getWorkspaceService(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'));
  } catch (error) {
    console.log('Get Workspace Controller Error', error);
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

export const getWorkspaceByJoinCodeController = async (req, res) => {
  try {
    const response = await getWorkspaceByJoinCodeService(
      req.params.joinCode,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Workspace  fetched By JoinCode successfully')
      );
  } catch (error) {
    console.log('getWorkspaceByJoinCodeController Error', error);
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

export const updateWorkspaceController = async (req, res) => {
  try {
    const response = await updateWorkspaceService(
      req.params.workspaceId,
      req.body,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace  updated successfully'));
  } catch (error) {
    console.log('updateWorkspaceController Error', error);
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

export const addMemberToWorkspaceController = async (req, res) => {
  try {
    const response = await addMemberToWorkspaceService(
      req.params.workspaceId,
      req.body.memberId,
      req.body.role || 'member',
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'added Member to the workspace  successfully')
      );
  } catch (error) {
    console.log('addMemberToWorkspaceController Error', error);
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

export const addChannelToWorkspaceController = async (req, res) => {
  try {
    const response = await addChannelToWorkspaceService(
      req.params.workspaceId,
      req.body.channelName,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(
          response,
          'added channel to the workspace  successfully'
        )
      );
  } catch (error) {
    console.log('addChannelToWorkspaceController Error', error);
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
