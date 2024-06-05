const userTypesService = require("../services/userTypesService");

exports.getAllUserTypes = async (req, res, next) => {
  try {
    const userTypes = await userTypesService.getAllUserTypes();
    res.status(200).json(userTypes);
  } catch (error) {
    next(error);
  }
};
exports.getUserTypeById = async (req, res, next) => {
  try {
    const userType = await userTypesService.getUserTypeById(
      req.params.user_type_id
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
    const updatedUserType = await userTypesService.updateUserType({
      user_type_id: req.params.user_type_id,
      ...req.body,
    });
    res.status(200).json(updatedUserType);
  } catch (error) {
    next(error);
  }
};
exports.deleteUserType = async (req, res, next) => {
  try {
    const deletedUserType = await userTypesService.deleteUserType(
      req.params.user_type_id
    );
    res.status(200).json(deletedUserType);
  } catch (error) {
    next(error);
  }
};
