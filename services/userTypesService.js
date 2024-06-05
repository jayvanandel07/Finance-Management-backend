const userTypesModel = require("../models/userTypesModel");

const getAllUserTypes = async () => {
  return await userTypesModel.getAllUserTypes();
};
const getUserTypeById = async (user_type_id) => {
  return await userTypesModel.getUserTypeById(user_type_id);
};
const createUserType = async (user_type) => {
  return await userTypesModel.createUserType(user_type);
};
const updateUserType = async (user_type) => {
  return await userTypesModel.updateUserType(user_type);
};
const deleteUserType = async (user_type_id) => {
  return await userTypesModel.deleteUserType(user_type_id);
};

module.exports = {
  getAllUserTypes,
  getUserTypeById,
  createUserType,
  updateUserType,
  deleteUserType,
};
