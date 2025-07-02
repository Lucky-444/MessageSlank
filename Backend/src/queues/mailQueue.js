import Queue from 'bull';

import { REDIS_HOST, REDIS_PORT } from '../config/serverConfig.js';
const mailQueue = new Queue('mail', {
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
});

export default mailQueue;
