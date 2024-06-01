const userTypeModel = require("../models/userTypeModel");

const createUserType = async (user_type) => {
  return await userTypeModel.createUserType(user_type);
};

module.exports = {
  createUserType,
};
