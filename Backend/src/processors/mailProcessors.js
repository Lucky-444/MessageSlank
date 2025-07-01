import mailQueue from '../queues/mailQueue.js';
import mailer from '../config/mailConfig.js';

mailQueue.process(async (job) => {
  // Process the job
  const emailData = job.data;
  console.log('Processing Email data:', emailData);

  try {
    // Send the email using a mail service (e.g., Nodemailer)
    const response = await mailer.sendMail(emailData);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.log('Error processing email:', error);
    throw error;
  }
});
