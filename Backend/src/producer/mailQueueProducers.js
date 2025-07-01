import mailQueue from '../queues/mailQueue.js';

export const addEmailToMailQueue = async (email) => {
  try {
    await mailQueue.add(email);
    console.log('Email added to mail queue');
  } catch (error) {
    console.log('mail queue producer error', error);
  }
};
