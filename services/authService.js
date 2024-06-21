const authModel = require("../models/authModel");

const register = async (user) => {
  return await authModel.register(user);
};

module.exports = {
  register,
};
