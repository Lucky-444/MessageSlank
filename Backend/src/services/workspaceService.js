import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import channelRepository from '../repositories/channelRepository.js';
import WorkspaceRepository from '../repositories/workspaceRepository.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

const isUserMemberOfTheWorkspace = (workspace, userId) => {
  return workspace.members.some((member) => {
    const memberId = (member.memberId?._id ?? member.memberId).toString();
    return memberId === userId.toString();
  });
};
// const isUserAdminOfTheWorkspace = (workspace, userId) => {
//   return workspace.members.some((member) => {
//     const memberId = (member.memberId?._id ?? member.memberId).toString();
//     return memberId === userId.toString() && member.role === 'admin';
//   });
// };

export const createWorkspaceService = async (workspace) => {
  //we have to create a joincode for our workspace the joincode must be unique
  //after creating the joincode we check
  // whether the joincode is alredy present in your DB or not

  //if there is already a joincode with same as this join code
  //then we have to regenerate our joincode again

  //this may take lots of iteration
  //so we pre prepare the joincode

  //now we have to add the joincode to our workspace
  //we dont need to have complete of uuidv4 (uuidv4() => returns strings of 36 chars)
  //we just parse the first 6-chars from it

  //now we have to add the joincode to our workspace
  //once the workspace hasbeen created then there atleast one channel in the workspace
  //in the moment of workspace created we need a basic channel in it

  //atleast one channel should be there
  //we should have a default channel in the workspace
  //we have to add the default channel to the workspace
  // + we should also add the cuurent user who creates the workspace as an admin of the workspace
  //the created user should be admin of the workspace

  //we use mongoose pre save hook to add the default channel while creating the workspace
  try {
    const joinCode = uuidv4().substring(0, 6).toUpperCase();

    //   const isJoinCodeAlreadyPresent = await WorkspaceRepository.getWorkspaceByJoinCode(joinCode);
    //   if (isJoinCodeAlreadyPresent) {
    //     return createWorkspace(workspace);
    //   }

    const response = await WorkspaceRepository.create({
      name: workspace.name,
      description: workspace.description,
      joincode: joinCode
    });

    await WorkspaceRepository.addMemberToWorkspace(
      response._id,
      workspace.owner,
      'admin'
    );

    const updatedWorkspace = await WorkspaceRepository.addChannelToWorkspace(
      response._id,
      'General'
    );
    return updatedWorkspace;
  } catch (error) {
    console.log('workspace service error', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      );
    }

    //duplicate things
    //it is already present

    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['A Workspace will already exists']
        },
        'A Workspace with same name already exists'
      );
    }

    throw error;
  }
};

export const getWorkspaceUserIsMemberOfService = async (userId) => {
  try {
    const workspace =
      await WorkspaceRepository.fetchAllWorkspaceByMemberID(userId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid user ID',
        message: 'No Workspace found with this ID',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  } catch (error) {
    console.log('workspace service error', error);
    throw error;
  }
};

export const deleteWorkspaceService = async (workspaceId, userId) => {
  try {
    //check if the user is the owner of the workspace
    //we need to delete the workspace by finding the workspace by id

    console.log('userId passed in:', userId, '| typeof:', typeof userId);
    console.log(
      'workspaceId passed in:',
      workspaceId,
      '| typeof:',
      typeof workspaceId
    );

    const workspace = await WorkspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid workspace ID',
        message: 'No Workspace found with this ID',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isAllowed = workspace.members.some((member) => {
      const memberId = (member.memberId?._id ?? member.memberId).toString();

      return memberId === userId.toString() && member.role === 'admin';
    });

    console.log(isAllowed);

    if (!isAllowed) {
      throw new ClientError({
        explanation:
          'useer is either not a menber of the workspace or is not an admin',
        message: 'You are not allowed to delete this workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    let workspaceDeleteResponse;
    if (isAllowed) {
      //workspace.channels --> provide you the channelIds of the workspace
      await channelRepository.deleteMany(workspace.channels);
      workspaceDeleteResponse = await WorkspaceRepository.delete(workspaceId);
    }

    return workspaceDeleteResponse;
  } catch (error) {
    console.log('workspace service error', error);
    throw error;
  }
};

export const getWorkspaceService = async (workspaceId, userId) => {
  try {
    const workspace = await WorkspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid Workspace ID',
        message: 'No Workspace found with this ID',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isMember = isUserMemberOfTheWorkspace(workspace, userId);
    if (!isMember) {
      throw new ClientError({
        explanation: 'User is Not a member of the Workspace',
        message: 'User is unAuthorized',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    return workspace;
  } catch (error) {
    console.log('Get Workspace Service Error', error);
    throw error;
  }
};
