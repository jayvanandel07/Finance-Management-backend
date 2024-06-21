const { hashPassword, verifyPassword } = require("../utils/authUtils");
const { generateToken } = require("../utils/jwtUtils");
const userModel = require("./usersModel");

const register = async (user) => {
  try {
    const hashedPassword = await hashPassword(user.password);
    const User = await userModel.createUser({
      ...user,
      password: hashedPassword,
    });

    const token = generateToken(User[0]);
    return { token };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
};
