import { StatusCodes } from 'http-status-codes';

import { getChannelByIdService } from '../services/channelService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObject.js';

export const getChannelByIdController = async (req, res) => {
  try {
    const response = await getChannelByIdService(
      req.params.channelId,
      req.user
    );

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Channel Fetched SuccessFully'));
  } catch (error) {
    console.log('Get Channel By Id controller Error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
