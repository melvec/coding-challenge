const createResponseObject = (status, message, data = null) => {
  return {
    status,
    message,
    data,
  };
};

module.exports = {
  createResponseObject,
};
