import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/serverConfig.js';
import userRepository from '../repositories/userRepository.js';
import {
  customErrorResponse,
  internalErrorResponse
} from '../utils/common/responseObject.js';

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Unauthorized Access No Token Provided',
          explanation: 'You need to provide a token to access this route'
        })
      );
    }

    const response = jwt.verify(token, JWT_SECRET);

    if (!response) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Unauthorized Access',
          explanation: 'Token is Expired or not valid'
        })
      );
    }

    const user = userRepository.getById(response.id);
    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Unauthorized Access',
          explanation: 'Token is Expired or not valid'
        })
      );
    }

    req.user = user.id;

    next();
  } catch (error) {
    console.log('Auth Middleware Error', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Unauthorized Access',
          explanation: 'Token is Expired or not valid'
        })
      );
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};


