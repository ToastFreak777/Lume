import { StatusCodes } from "http-status-codes";
import Attendance from "../models/attendance.model.js";
import Users from "../models/users.model.js";
import { validateFields } from "../utils/helpers.js";
import { createCustomError } from "../errors/custom-error.js";

export const getAllAttendance = async (req, res) => {
  const attendance = await Attendance.find({});

  res.status(StatusCodes.OK).json(attendance);
};
export const getAttendanceForCourse = async (req, res) => {
  const attendance = await Attendance.find({ course: req.body.course });

  res.status(StatusCodes.OK).json(attendance);
};

export const getAttendance = async (req, res) => {
  const attendance = await Attendance.find({ _id: req.params.id });

  res.status(StatusCodes.OK).json(attendance);
};

export const addAttendance = async (req, res, next) => {
  const requiredFields = {
    name: "Attendance Name",
    course: "Course Id",
    dueDate: "Due Date",
    maxGrade: "Max Grade",
  };

  if (
    !validateFields(
      requiredFields,
      req.body,
      next,
      createCustomError,
      StatusCodes.BAD_REQUEST
    )
  )
    return;

  const user = await Users.findById(req.user.id).lean();

  const notFaculty = !["Admin", "Instructor"].includes(user.role);

  if (notFaculty)
    return next(
      createCustomError(
        "You're not authorized to perform this action",
        StatusCodes.BAD_REQUEST
      )
    );

  const attendance = await Attendance.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: `${attendance.name} created` });
};

export const updateAttendance = async (req, res) => {
  const user = await Users.findById(req.user.id).lean();

  const notFaculty = !["Admin", "Instructor"].includes(user.role);

  if (notFaculty)
    return next(
      createCustomError(
        "You're not authorized to perform this action",
        StatusCodes.BAD_REQUEST
      )
    );

  const attendance = await Attendances.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    msg: `${attendance.name} attendance updated successfully`,
    attendance,
  });
};

export const deleteAttendance = async (req, res) => {
  const user = await Users.findById(req.user.id).lean();

  const notFaculty = !["Admin", "Instructor"].includes(user.role);

  if (notFaculty)
    return next(
      createCustomError(
        "You're not authorized to perform this action",
        StatusCodes.BAD_REQUEST
      )
    );

  const attendance = await Attendance.findByIdAndDelete(req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ msg: `${attendance.name} attendance deleted successfully` });
};
