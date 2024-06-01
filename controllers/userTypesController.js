const userTypesService = require("../services/userTypesService");

exports.createUserType = async (req, res, next) => {
  try {
    const userType = await userTypesService.createUserType(req.body);
    res.status(201).json(userType);
  } catch (error) {
    next(error);
  }
};
