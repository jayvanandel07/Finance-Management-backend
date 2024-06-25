const usersService = require("../services/usersService");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
exports.getUsersByRole = async (req, res, next) => {
  try {
    let roles = req.params.role.split(",");
    const users = await usersService.getUsers();
    const usersByRole = users.filter((user) =>
      roles.includes(user.user_type_name)
    );
    res.status(200).json(usersByRole);
  } catch (error) {
    next(error);
  }
};
exports.getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.user_id);
    res.status(200).json(user);
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
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await usersService.deleteUser(req.params.user_id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
