const dynamoose = require("dynamoose");
const { Person } = require("../model/Person");
const getPersons = async (event) => {
  const persons = await Person.scan().exec();
  return persons.toJSON();
};
const getPerson = async (event) => {
  const id = event.pathParameters.id;

  const person = await Person.get(id);

  return person;
};

const updatePerson = async (event) => {
  const id = event.pathParameters.id;
  const body = JSON.parse(event.body);
  const { name, age, lastname } = body;

  const person = await Person.get(id);
  if (!person) {
    return {
      statusCode: 404,
      data: "Person not found",
    };
  }
  person.age = age;
  person.name = name;
  person.lastname = lastname;
  await person.save();
  return person;
};

module.exports = {
  getPersons,
  getPerson,
  updatePerson,
};
