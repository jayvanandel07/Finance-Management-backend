const userTypesService = require("../services/userTypesService");

exports.getAllUserTypes = async (req, res, next) => {
  try {
    const userTypes = await userTypesService.getAllUserTypes();
    res.status(200).json(userTypes);
  } catch (error) {
    next(error);
  }
};

exports.createUserType = async (req, res, next) => {
  try {
    const userType = await userTypesService.createUserType(req.body);
    res.status(201).json(userType);
  } catch (error) {
    next(error);
  }
};
