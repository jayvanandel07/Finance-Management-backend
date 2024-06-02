const userService = require("../services/userService");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
exports.getUserByIdOrName = async (req, res, next) => {
  try {
    const users = await userService.getUserByIdOrName(req.params.user);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser({
      ...req.body,
      update_user_id: req.params.user_id,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await userService.deleteUserById(req.params.user_id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
