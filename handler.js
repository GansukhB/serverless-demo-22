"use strict";
const AWS = require("aws-sdk");

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

("use strict");

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
module.exports.getPresignedUrl = async (event) => {
  const s3 = new AWS.S3();
  AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "us-east-1",
    signatureVersion: "v4",
  });

  // Tried with and without this. Since s3 is not region-specific, I don't
  // think it should be necessary.
  // AWS.config.update({region: 'us-west-2'})

  const myBucket = "test-bucket-leap2022";
  const myKey = "file-name33.pdf";
  const signedUrlExpireSeconds = 300;

  const url = s3.getSignedUrl("putObject", {
    Bucket: myBucket,
    Key: myKey,
    Expires: signedUrlExpireSeconds,
    ContentType: "image/png",
  });

  const geturl = await s3
    .getSignedUrl("getObject", {
      Bucket: myBucket,
      Key: myKey,
      Expires: signedUrlExpireSeconds,
      //ContentType: "image/png",
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      getUrl: geturl,
    }),
  };
};
