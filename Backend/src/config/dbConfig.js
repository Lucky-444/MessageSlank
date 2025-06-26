import mongoose from 'mongoose';

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from './serverConfig.js';

export default async function connectDB() {
  try {
    if (NODE_ENV === 'development') {
      await mongoose.connect(DEV_DB_URL);
      console.log(`connected to MongoDB from ${NODE_ENV} environment`);
    } else if (NODE_ENV === 'production') {
      await mongoose.connect(PROD_DB_URL);
    }
  } catch (error) {
    console.log(error);
  }
}
