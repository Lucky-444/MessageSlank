import { StatusCodes } from 'http-status-codes';

import { signInService, signupService, verifyTokenService } from '../services/userService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObject.js';

export const signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'User Created SuccessFully'));
  } catch (error) {
    console.log('User Controller Error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const signin = async (req, res) => {
  try {
    const response = await signInService(req.body);

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User SIGN IN SuccessFully'));
  } catch (error) {
    console.log('user controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};



export const verifyEmailController = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await verifyTokenService(token);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(user, 'User verified successfully'));
  } catch (error) {
    console.log('Verify Email Controller Error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
}