const { faker } = require("@faker-js/faker");

const generateData = (length) => {
  const data = [];
  const createRamdomProduct = () => {
    return {
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image(),
    };
  };
  Array.from({ length: length }).forEach(() => {
    data.push(createRamdomProduct());
  });
  return data;
};

module.exports = { generateData };