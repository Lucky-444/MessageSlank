import { MAIL_ID } from '../../config/serverConfig.js';

export const mailObject = function (workspace) {
  return {
    from: MAIL_ID,
    subject: 'You have been added to a workspace',
    text: `Congratulation! : You have been added to ${workspace.name}`
  };
};
