import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositories/channelRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfTheWorkspace } from './workspaceService.js';

export const getChannelByIdService = async (channelId, userId) => {
  try {
    const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);

    if (!channel || !channel.workspaceId) {
      throw new ClientError({
        message: 'Channel Not Found',
        explanation: 'Invalid data send from Client',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserPartOfWorkspace = isUserMemberOfTheWorkspace(channel.workspaceId, userId);
    if (!isUserPartOfWorkspace) {
      throw new ClientError({
        message:
          'User Is not a part of Workspace and Hence Cannot be Fetch any Details of Workspace',
        explanation: 'USer is Not a part of Workspace',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return channel;
  } catch (error) {
    console.log('Get Channel By ID Error', error);
    throw error;
  }
};
