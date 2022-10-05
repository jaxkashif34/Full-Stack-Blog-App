const bcrypt = require('bcrypt');
const generateHashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (typedPassword, existingPassword) => {
  return await bcrypt.compare(typedPassword, existingPassword);
};

module.exports = { generateHashPassword, comparePassword };
