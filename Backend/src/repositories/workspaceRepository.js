import { StatusCodes } from 'http-status-codes';

import User from '../schema/user.js';
import Workspace from '../schema/workSpace.js';
import ClientError from '../utils/errors/clientError.js';
import channelRepository from './channelRepository.js';
import crudRepository from './crudRepository.js';
const WorkspaceRepository = {
  ...crudRepository(Workspace),
  getWorkspaceDetailsByid: async function (workspaceId) {
    const workspace = await Workspace.findById(workspaceId)
      .populate('members.memberId', 'username email avatar')
      .populate('channels');
    return workspace;
  },
  getWorkspaceByName: async function (workspaceName) {
    const workspace = await Workspace.findOne({ name: workspaceName });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid workspace name',
        message: 'No workspace found with this name',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return workspace;
  },
  getWorkspaceByJoinCode: async function (joinCode) {
    const workspace = await Workspace.findOne({ joincode: joinCode });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid join code',
        message: 'No workspace found with this join code',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return workspace;
  },

  addMemberToWorkspace: async function (workspaceId, memberId, role) {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid workspace ID',
        message: 'No workspace found with this ID',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid user ID',
        message: 'No user found with this ID',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isMemberedAlreadyPartOfWorkspace = workspace.members.find(
      (member) => {
        console.log('MemberId ->', memberId);
        member.memberId?._id.toString() === memberId.toString();
      }
    );

    if (isMemberedAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid userID sent from client',
        message: 'User already present with this ID',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    workspace.members.push({ memberId, role });
    await workspace.save();
    return workspace;
  },

  addChannelToWorkspace: async function (workspaceId, channelName) {
    const workspace =
      await Workspace.findById(workspaceId).populate('channels');
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid workspace ID',
        message: 'No workspace found with this ID',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
      (channel) => {
        channel.name === channelName;
      }
    );

    if (isChannelAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid channel name sent from client',
        message: ' channel already Present with this name',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    //if not part of workspace then  we create a new channel for it
    const channel = await channelRepository.create({
      name: channelName,
      workspaceId: workspaceId
    });

    workspace.channels.push(channel);
    await workspace.save();
    return workspace;
  },

  fetchAllWorkspaceByMemberID: async function (memberId) {
    const workspaces = await Workspace.find({
      'members.memberId': memberId
    }).populate('members.memberId', 'username avatar email');
    return workspaces;
  }
};

export default WorkspaceRepository;
