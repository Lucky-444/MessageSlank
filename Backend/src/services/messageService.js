import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositories/channelRepository.js';
import messageRepository from '../repositories/messageRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfTheWorkspace } from './workspaceService.js';

export const createMessageService = async (message) => {
  try {
    const newMessage = await messageRepository.create(message);
     // 👇 Populate senderId and optionally channelId for frontend UI
    const populatedMessage = await newMessage.populate([
      { path: 'senderId', select: 'username avatar email' },
      { path: 'channelId', select: 'name' }
    ]);

    // Convert to plain JS object to ensure all fields, including timestamps, are visible
    const messageObj = populatedMessage.toObject();
    console.log("messageObject is ->" , messageObj);
    
    return messageObj;
  } catch (error) {
    console.log('createMessageService error', error);
    throw error;
  }
};

export const getMessagesService = async (
  messageParams,
  page,
  limit,
  userId
) => {
  try {
    const channelDetails =
      await channelRepository.getChannelWithWorkspaceDetails(
        messageParams.channelId
      );

    const workspace = channelDetails.workspaceId;
    const isUserPartOfWorkspace = isUserMemberOfTheWorkspace(workspace, userId);

    if (!isUserPartOfWorkspace) {
      throw new ClientError({
        message:
          'User Is not a part of Workspace and Hence Cannot be Fetch any Details of Workspace',
        explanation: 'USer is Not a part of Workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }
    const messages = await messageRepository.getPaginatedMessage(
      messageParams,
      page,
      limit
    );

    return messages;
  } catch (error) {
    console.log('get messages service error', error);
    throw error;
  }
};
