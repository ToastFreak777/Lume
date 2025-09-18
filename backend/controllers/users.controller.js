import { createCustomError } from "../errors/custom-error.js";
import Users from "../models/users.model.js";
import Courses from "../models/courses.model.js";

import { StatusCodes } from "http-status-codes";

export const getUsers = async (req, res) => {
  const { role } = req.query;

  const users = await Users.find(
    role ? { role: role } : { role: { $ne: "Admin" } },
  );

  res.status(StatusCodes.OK).json(users);
};

export const getUser = async (req, res) => {
  const user = (await Users.findById(req.params.id)) || {};
  res.status(StatusCodes.OK).json(user);
};

export const updateUser = async (req, res, next) => {
  await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "User updated successfully" });
};

export const deleteUser = async (req, res, next) => {
  const user = await Users.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(createCustomError("User not found", StatusCodes.NOT_FOUND));
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: `User of id ${user._id} deleted successfully` });
};

export const getClassmates = async (req, res) => {
  const query = { enrolledStudents: { $in: req.user.id } };
  const people = await Courses.find(query)
    .select("instructor enrolledStudents")
    .populate({
      path: "instructor",
      select: "firstName lastName email role",
    })
    .populate({
      path: "enrolledStudents",
      select: "firstName lastName email role",
    });

  res.status(StatusCodes.OK).json({ people });
};
