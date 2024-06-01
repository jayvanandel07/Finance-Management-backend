const userTypesModel = require("../models/userTypesModel");

const createUserType = async (user_type) => {
  return await userTypesModel.createUserType(user_type);
};

module.exports = {
  createUserType,
};
