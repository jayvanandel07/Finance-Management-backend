const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const token = await authService.register(req.body);
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
};
