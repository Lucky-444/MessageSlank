import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositories/channelRepository.js';
import messageRepository from '../repositories/messageRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfTheWorkspace } from './workspaceService.js';

export const getChannelByIdService = async (channelId, userId) => {
  try {
    const channel =
      await channelRepository.getChannelWithWorkspaceDetails(channelId);

    if (!channel || !channel.workspaceId) {
      throw new ClientError({
        message: 'Channel Not Found',
        explanation: 'Invalid data send from Client',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserPartOfWorkspace = isUserMemberOfTheWorkspace(
      channel.workspaceId,
      userId
    );
    if (!isUserPartOfWorkspace) {
      throw new ClientError({
        message:
          'User Is not a part of Workspace and Hence Cannot be Fetch any Details of Workspace',
        explanation: 'USer is Not a part of Workspace',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    //fetching message details of the channel
    const message = await messageRepository.getPaginatedMessage(
      {
        channelId: channelId
      },
      1,
      20
    );

    //making our custom response object
    const response = {
      channel: channel,
      messages: message
      // _id : channelId,
      // name : channel.name,
      // workspaceId : channel.workspaceId,
      // createdAt : channel.createdAt,
      // updatedAt : channel.updatedAt
    };

    return response;
  } catch (error) {
    console.log('Get Channel By ID Error', error);
    throw error;
  }
};
