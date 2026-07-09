import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const getAllUsers = async () => {
  return await User.find().sort({
    createdAt: -1,
  });
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (user.role === "ADMIN") {
    throw new Error("Cannot delete Admin account!");
  }
  await Todo.deleteMany({ user: id });
  return await User.findByIdAndDelete(id);
};
