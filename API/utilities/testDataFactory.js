const { faker } = require("@faker-js/faker");

function uniqueEmail() {
  return `qa.toolshop.${Date.now()}.${faker.string.alphanumeric(6)}@mailinator.com`;
}

function uniquePassword() {
  return `Qa#${faker.string.alphanumeric(10)}9!`;
}

function buildRegisterPayload() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    dob: "1992-06-15",
    phone: "5551234567",
    email: uniqueEmail(),
    password: uniquePassword(),
    address: {
      street: faker.location.streetAddress(),
      house_number: "101",
      city: "New York",
      state: "NY",
      country: "US",
      postal_code: "10001",
    },
  };
}

function demoCustomer() {
  return {
    email: process.env.DEMO_EMAIL || "customer@practicesoftwaretesting.com",
    password: process.env.DEMO_PASSWORD || "welcome01",
  };
}

module.exports = {
  uniqueEmail,
  uniquePassword,
  buildRegisterPayload,
  demoCustomer,
};
