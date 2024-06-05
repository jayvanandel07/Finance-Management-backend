const usersService = require("../services/usersService");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
exports.getUserByIdOrName = async (req, res, next) => {
  try {
    const users = await usersService.getUserByIdOrName(req.params.user);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
exports.createUser = async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const user = await usersService.updateUser({
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
    const user = await usersService.deleteUserById(req.params.user_id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
