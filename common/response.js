const response = ({ statusCode = 200, data }) => {
  return {
    statusCode,
    body: JSON.stringify(data),
  };
};

module.exports = response;
