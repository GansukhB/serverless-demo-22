"use strict";
const AWS = require("aws-sdk");
const dynamoose = require("dynamoose");
const {
  getPersons,
  getPerson,
  updatePerson,
} = require("./controllers/personController");
const response = require("./common/response");

module.exports.controllers = async (event) => {
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
  });
  dynamoose.aws.ddb.set(ddb);
  let person, statusCode, data;

  switch (event.pathParameters.controller) {
    case "getPersons":
      const persons = await getPersons(event);
      return response({ data: persons });
    case "getPerson":
      person = await getPerson(event);
      return response({ data: person });
    case "updatePerson":
      person = await updatePerson(event);
      return response({ data: person });
    default:
  }

  //const person = await Person.query("id").eq("asdfasdf").exec();
  return {
    statusCode: 200,
    body: "",
  };
};

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
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
    signatureVersion: "v4",
  });
  const s3 = new AWS.S3();

  // Tried with and without this. Since s3 is not region-specific, I don't
  // think it should be necessary.
  // AWS.config.update({region: 'us-west-2'})

  const myBucket = "test-bucket-leap2022";
  const myKey = "file-name.pdf";
  const signedUrlExpireSeconds = 3000;

  const url = await s3.getSignedUrlPromise("putObject", {
    Bucket: myBucket,
    Key: myKey,
    Expires: signedUrlExpireSeconds,
    //ContentType: "image/*",
  });
  console.log(url);

  // const geturl = await s3
  //   .getSignedUrl("getObject", {
  //     Bucket: myBucket,
  //     Key: myKey,
  //     Expires: signedUrlExpireSeconds,
  //     //ContentType: "image/png",
  //   })
  //   .promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      getUrl: url,
    }),
  };
};
