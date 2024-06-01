const userTypeService = require("../services/userTypeService");

exports.createUserType = async (req, res, next) => {
  try {
    const userType = await userTypeService.createUserType(req.body);
    res.status(201).json(userType);
  } catch (error) {
    next(error);
  }
};
