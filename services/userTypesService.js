const userTypesModel = require("../models/userTypesModel");

const getAllUserTypes = async (user_type) => {
  return await userTypesModel.getAllUserTypes(user_type);
};
const createUserType = async (user_type) => {
  return await userTypesModel.createUserType(user_type);
};

module.exports = {
  getAllUserTypes,
  createUserType,
};
