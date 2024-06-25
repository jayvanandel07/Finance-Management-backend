const db = require("../config/db");
const HttpError = require("../utils/httpError");
const { hashPassword, verifyPassword } = require("../utils/authUtils");
const { generateToken } = require("../utils/jwtUtils");
const userModel = require("./usersModel");

const register = async (user) => {
  try {
    const User = await userModel.createUser(user);

    const token = generateToken(User[0]);
    return { token };
  } catch (error) {
    throw error;
  }
};
const login = async (user) => {
  const { user_id, password } = user;

  try {
    const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [
      user_id,
    ]);

    if (!user) {
      throw new HttpError("Invalid email or password", 400);
    }

    const isMatch = await verifyPassword(password, user[0].password);
    if (!isMatch) {
      throw new HttpError("Invalid email or password", 400);
    }

    const token = generateToken(user[0]);
    return { token };
  } catch (error) {
    throw new HttpError(error.message, 400);
  }
};

module.exports = {
  register,
  login,
};
