import mongoose from 'mongoose';

import Message from '../schema/message.js';
import crudRepository from './crudRepository.js';

const messageRepository = {
  ...crudRepository(Message),
  getPaginatedMessage: async function (messageParams, page, limit) {
    //the recently message comes first
    const filter = {
      ...messageParams,
      channelId: new mongoose.Types.ObjectId(messageParams.channelId)
    };
    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('senderId', 'username email avatar')
      .populate('channelId', 'name');

    return messages;
  }
};

export default messageRepository;
