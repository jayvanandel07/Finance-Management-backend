const userTypesModel = require("../models/userTypesModel");

const getAllUserTypes = async () => {
  return await userTypesModel.getAllUserTypes();
};
const getUserTypeByName = async (type_name) => {
  return await userTypesModel.getUserTypeByName(type_name);
};
const createUserType = async (user_type) => {
  return await userTypesModel.createUserType(user_type);
};
const updateUserType = async (user_type) => {
  return await userTypesModel.updateUserType(user_type);
};

module.exports = {
  getAllUserTypes,
  getUserTypeByName,
  createUserType,
  updateUserType,
};
