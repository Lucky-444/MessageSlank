import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../config/serverConfig.js';

export const createJWT = (payloads) => {
  return jwt.sign(payloads, JWT_SECRET, {
    expiresIn: '1d'
  });
};
