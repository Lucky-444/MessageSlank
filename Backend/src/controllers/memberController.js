import { StatusCodes } from "http-status-codes";
import { isMemberPartOfTheWorkspaceService } from "../services/memberService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObject.js";
export const isMemberPartOfTheWorkspaceController = async (req, res) => {
  try {
    const response = await isMemberPartOfTheWorkspaceService(
      req.params.workspaceId,
//       req.params.memberId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Member fetched successfully'));
  } catch (error) {
    console.log('isMemberPartOfTheWorkspaceController Error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error, error.message));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error, error.message));
  }
};
