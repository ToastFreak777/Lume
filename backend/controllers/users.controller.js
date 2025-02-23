import Users from "../models/users.model.js";
import { StatusCodes } from "http-status-codes";

export const getUsers = async (req, res) => {
  const { role } = req.query;

  const users = await Users.find(
    role ? { role: role } : { role: { $ne: "Admin" } }
  );

  res.status(StatusCodes.OK).json(users);
};

export const getUser = async (req, res) => {
  const user = await Users.findById(req.params.id);

  res.status(StatusCodes.OK).json(user);
};

export const updateUser = async (req, res) => {
  //! Needs more protection but good base for now

  await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "User updated successfully" });
};

export const deleteUser = async (req, res) => {
  const user = await Users.findByIdAndDelete(req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ msg: `User of id ${user._id} deleted successfully` });
};
