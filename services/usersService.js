const usersModel = require("../models/usersModel");

const getUsers = async () => {
  return await usersModel.getUsers();
};

const getUserById = async (user_id) => {
  return await usersModel.getUserById(user_id);
};

const createUser = async (user) => {
  return await usersModel.createUser(user);
};
const updateUser = async (user) => {
  return await usersModel.updateUser(user);
};
const deleteUser = async (user_id) => {
  return await usersModel.deleteUser(user_id);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
