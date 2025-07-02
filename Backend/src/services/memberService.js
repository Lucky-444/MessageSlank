import userRepository from '../repositories/userRepository.js';
import WorkspaceRepository from '../repositories/workspaceRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfTheWorkspace } from './workspaceService.js';

export const isMemberPartOfTheWorkspaceService = async (workspaceId, memberId) => {
  try {
    const workspace = await WorkspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid Workspace ID',
        message: 'No Workspace found with this ID',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isMember = isUserMemberOfTheWorkspace(workspace, memberId);
    if (!isMember) {
      throw new ClientError({
        explanation: 'User is Not a member of the Workspace',
        message: 'User is unAuthorized',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const user = await userRepository.getById(memberId);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid User ID',
        message: 'No User found with this ID',
        statusCode: StatusCodes.NOT_FOUND
      });
    }


    return user;
  } catch (error) {
    console.log('isMemberPartOfTheWorkspaceService Error', error);
    throw error;
  }
};
