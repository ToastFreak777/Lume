import { StatusCodes } from "http-status-codes";
import Assignments from "../models/assignments.model.js";
import Users from "../models/users.model.js";
import { validateFields } from "../utils/helpers.js";
import { createCustomError } from "../errors/custom-error.js";

export const getAssignments = async (req, res) => {
  const assignments = await Assignments.find({});

  res.status(StatusCodes.OK).json(assignments);
};
export const getAssignmentsForCourse = async (req, res) => {
  const assignments = await Assignments.find({ course: req.body.course });

  res.status(StatusCodes.OK).json(assignments);
};

export const getAssignment = async (req, res) => {
  const assignment = await Assignments.find({ _id: req.params.id });

  res.status(StatusCodes.OK).json(assignment);
};

export const addAssignment = async (req, res, next) => {
  const requiredFields = {
    name: "Assignment Name",
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

  const assignment = await Assignments.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: `${assignment.name} created` });
};

export const updateAssignment = async (req, res) => {
  const user = await Users.findById(req.user.id).lean();

  const notFaculty = !["Admin", "Instructor"].includes(user.role);

  if (notFaculty)
    return next(
      createCustomError(
        "You're not authorized to perform this action",
        StatusCodes.BAD_REQUEST
      )
    );

  const assignment = await Assignments.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  );

  res
    .status(StatusCodes.OK)
    .json({
      msg: `${assignment.name} assignment updated successfully`,
      assignment,
    });
};

export const deleteAssignment = async (req, res) => {
  const user = await Users.findById(req.user.id).lean();

  const notFaculty = !["Admin", "Instructor"].includes(user.role);

  if (notFaculty)
    return next(
      createCustomError(
        "You're not authorized to perform this action",
        StatusCodes.BAD_REQUEST
      )
    );

  const assignment = await Assignments.findByIdAndDelete(req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ msg: `${assignment.name} assignment deleted successfully` });
};
