const dynamoose = require("dynamoose");
const personsSchema = new dynamoose.Schema(
  {
    id: String,
    name: String,
    age: Number,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);
const Person = dynamoose.model("Person", personsSchema);
const PersonTable = new dynamoose.Table("PersonTable", [Person]);

module.exports = {
  Person,
  PersonTable,
};
