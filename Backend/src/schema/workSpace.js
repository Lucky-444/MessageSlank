import mongoose from 'mongoose';

const workSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Workspace name is required'],
    unique: [true, 'Workspace name already exists']
  },
  description: {
    type: String
  },
  members: [
    {
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
      }
    }
  ],
  joincode: {
    type: String,
    required: [true, 'Workspace join code is required']
  },
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel'
    }
  ]
});

const Workspace = mongoose.model('Workspace', workSpaceSchema);
export default Workspace;
