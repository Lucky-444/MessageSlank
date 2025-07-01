import { z } from 'zod';

export const workspaceSchema = z.object({
  name: z.string(),
});


export const addMemberToWorkspaceSchema = z.object({
  memberId : z.string(),
})
export const addChannelToWorkspaceSchema = z.object({
  channelName : z.string(),
})