const userModel = require("../models/userModel");

const getUsers = async () => {
  return await userModel.getUsers();
};

const getUserByIdOrName = async (user) => {
  return await userModel.getUserByIdOrName(user);
};

const createUser = async (user) => {
  return await userModel.createUser(user);
};

module.exports = {
  getUsers,
  getUserByIdOrName,
  createUser,
};
