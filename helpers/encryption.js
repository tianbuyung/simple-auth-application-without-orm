const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => bcrypt.hashSync(password, salt);

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  hashPassword,
  comparePassword,
};