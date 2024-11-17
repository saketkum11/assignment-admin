const ApiErrorHandler = (message, statusCode) => {
  return {
    status: statusCode,
    message: message,
  };
};

export { ApiErrorHandler };
