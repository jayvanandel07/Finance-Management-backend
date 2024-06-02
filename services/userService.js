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
const updateUser = async (user) => {
  return await userModel.updateUser(user);
};
const deleteUserById = async (user_id) => {
  return await userModel.deleteUserById(user_id);
};

module.exports = {
  getUsers,
  getUserByIdOrName,
  createUser,
  updateUser,
  deleteUserById,
};
