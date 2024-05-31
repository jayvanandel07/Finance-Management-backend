const userModel = require("../models/userModel");

const createUser = async (user) => {
  return await userModel.createUser(user);
};

const getUsers = async () => {
  return await userModel.getUsers();
};

module.exports = {
  createUser,
  getUsers,
};
