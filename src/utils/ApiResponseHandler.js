const ApiResponseHandler = (data, message, statusCode) => {
  return {
    data: data,
    message: message,
    status: statusCode,
  };
};
export { ApiResponseHandler };
