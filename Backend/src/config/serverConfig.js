import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DEV_DB_URL = process.env.DEV_DB_URL;

export const PROD_DB_URL = process.env.PROD_DB_URL;

export const JWT_SECRET = process.env.JWT_SECRET;

export const MAIL_ID = process.env.MAIL_ID;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;

export const ENABLE_EMAIL_VERIFICATION =
  process.env.ENABLE_EMAIL_VERIFICATION || 'false';
export const ENABLE_PASSWORD_RESET =
  process.env.ENABLE_PASSWORD_RESET === 'true';
export const ENABLE_TWO_FACTOR_AUTH =
  process.env.ENABLE_TWO_FACTOR_AUTH === 'true';
export const ENABLE_USER_REGISTRATION =
  process.env.ENABLE_USER_REGISTRATION === 'true';
export const ENABLE_USER_LOGIN = process.env.ENABLE_USER_LOGIN === 'true';
export const APP_LINK = process.env.APP_LINK || 'http://localhost:3000';
export const APP_NAME = process.env.APP_NAME || 'MessageSlank';
// export const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;
