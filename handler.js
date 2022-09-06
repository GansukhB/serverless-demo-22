"use strict";

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go SLS v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
const processTest = async (event) => {
  return {
    statusCode: 200,
    body: "hello",
  };
};
module.exports.api = async (event) => {
  const route = event.pathParameters.routeName;
  switch (route) {
    case "test":
      return processTest(event);
      break;
    default:
  }

  return {};
};
