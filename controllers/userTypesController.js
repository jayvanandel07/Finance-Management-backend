const userTypesService = require("../services/userTypesService");

exports.getAllUserTypes = async (req, res, next) => {
  try {
    const userTypes = await userTypesService.getAllUserTypes();
    res.status(200).json(userTypes);
  } catch (error) {
    next(error);
  }
};
exports.getUserTypeByName = async (req, res, next) => {
  try {
    const userType = await userTypesService.getUserTypeByName(
      req.params.type_name
    );
    res.status(200).json(userType);
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

exports.updateUserType = async (req, res, next) => {
  try {
    const updatedUserType = await userTypesService.updateUserType(req.body);
    res.status(200).json(updatedUserType);
  } catch (error) {
    next(error);
  }
};
