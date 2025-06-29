import { v4 as uuidv4 } from 'uuid';

import WorkspaceRepository from '../repositories/workspaceRepository.js';

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

  const joinCode = uuidv4().substring(0, 6);

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

  await WorkspaceRepository.addChannelToWorkspace(response._id, 'General');
  return response;
};
