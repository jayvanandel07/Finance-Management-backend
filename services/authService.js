const authModel = require("../models/authModel");

const register = async (user) => {
  return await authModel.register(user);
};
const login = async (user) => {
  return await authModel.login(user);
};

module.exports = {
  register,
  login,
};
