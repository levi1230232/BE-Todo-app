import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
};

export const register = async ({ name, email, password }) => {
  const existed = await User.findOne({ email });
  if (existed) {
    throw new Error("Email already exists");
  }
  const hashesPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashesPassword });
  return { user, token: generateToken(user) };
};
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid email or password");
  }
  return { user, token: generateToken(user) };
};
