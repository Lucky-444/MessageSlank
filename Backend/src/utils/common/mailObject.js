import { APP_LINK, MAIL_ID } from '../../config/serverConfig.js';

export const mailObject = function (workspace) {
  return {
    from: MAIL_ID,
    subject: 'You have been added to a workspace',
    text: `Congratulation! : You have been added to ${workspace.name}`
  };
};

export const verifyEmailMail = function (verificationToken) {
  return {
    from: MAIL_ID,
    subject: 'Welcome To the app . Please verify your email',
    text: `
     welcome to the app . Please Verify your email by clicking on the link below
     If you did not create an account, please ignore this email.
     ${APP_LINK}/verify/${verificationToken}
    `
  };
};
