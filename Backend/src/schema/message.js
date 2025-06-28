import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Message is required']
  },
  image: {
    type: String
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
    required: [true, 'ChannelId is required']
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Sender is required']
  },

  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: [true, 'workspace ID required']
  }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
