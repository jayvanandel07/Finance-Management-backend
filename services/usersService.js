const usersModel = require("../models/usersModel");

const getUsers = async () => {
  return await usersModel.getUsers();
};

const getUserByIdOrName = async (user) => {
  return await usersModel.getUserByIdOrName(user);
};

const createUser = async (user) => {
  return await usersModel.createUser(user);
};
const updateUser = async (user) => {
  return await usersModel.updateUser(user);
};
const deleteUserById = async (user_id) => {
  return await usersModel.deleteUserById(user_id);
};

module.exports = {
  getUsers,
  getUserByIdOrName,
  createUser,
  updateUser,
  deleteUserById,
};
