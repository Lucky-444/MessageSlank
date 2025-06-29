export const internalErrorResponse = (error) => {
  return {
    success: false,
    err: error,
    data: {},
    message: error.message || 'Internal server Error'
  };
};

export const customErrorResponse = (error) => {
  if (!error.message && !error.explanation) {
    return internalErrorResponse(error);
  }
  return {
    success: false,
    err: error,
    data: {},
    message: error.message
  };
};

export const successResponse = (data, message) => {
  return {
    success: true,
    err: {},
    data: data,
    message: message
  };
};
