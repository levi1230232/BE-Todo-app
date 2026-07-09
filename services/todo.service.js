import Todo from "../models/Todo.js";

export const createTodo = async (userId, data) => {
  return await Todo.create({
    ...data,
    user: userId,
  });
};

export const getMyTodos = async (userId) => {
  return await Todo.find({ user: userId }).sort({
    createdAt: -1,
  });
};

export const getAllTodos = async () => {
  return await Todo.find()
    .populate("user", "name email role")
    .sort({ createdAt: -1 });
};

export const getTodoById = async (id) => {
  return await Todo.findById(id).populate("user", "name email role");
};

export const updateTodo = async (id, userId, data) => {
  return await Todo.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    data,
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
};

export const deleteTodo = async (id, userId) => {
  return await Todo.findOneAndDelete({
    _id: id,
    user: userId,
  });
};

export const completeTodo = async (id, userId) => {
  return await Todo.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    {
      completed: true,
    },
    {
      returnDocument: "after",
    },
  );
};

export const adminDeleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};
