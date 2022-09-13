const { PersonTable } = require("../model/Person");
const dynamoose = require("dynamoose");

const ddb = new dynamoose.aws.ddb.DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});
dynamoose.aws.ddb.set(ddb);

const createTables = async () => {
  try {
    await PersonTable.create();
  } catch (e) {
    console.log("PersonTable already exists");
  }
};
try {
  createTables();
} catch (e) {
  console.log("end");
}
