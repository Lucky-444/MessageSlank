import '../processors/mailProcessors.js';

import mailQueue from '../queues/mailQueue.js';

export const addEmailToMailQueue = async (email) => {
  console.log('initiating email sending process');

  try {
    await mailQueue.add(email);
    console.log('Email added to mail queue');
  } catch (error) {
    console.log('mail queue producer error', error);
  }
};
