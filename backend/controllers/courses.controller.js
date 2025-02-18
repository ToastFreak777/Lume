import { StatusCodes } from "http-status-codes";
import Courses from "../models/courses.model.js";
import { createCustomError } from "../errors/custom-error.js";

export const getCourses = async (req, res) => {
  const courses = await Courses.find().lean();

  res.status(StatusCodes.OK).json(courses);
};

export const getCourse = async (req, res) => {
  const course = await Courses.findById(req.params.id);

  res.status(StatusCodes.OK).json(course);
};

export const addCourse = async (req, res, next) => {
  const {
    name,
    instructorId,
    subject,
    level,
    semester,
    startDate,
    endDate,
    classCode,
    credits,
    capacity,
  } = req.body;

  if (
    !name ||
    !instructorId ||
    !subject ||
    !level ||
    !semester ||
    !startDate ||
    !endDate ||
    !classCode ||
    !credits ||
    !capacity
  ) {
    return next(
      createCustomError(
        "Please provide all required fields",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const course = await Courses.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: `${course.name} created` });
};

export const updateCourse = async (req, res) => {
  await Courses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "course updated successfully" });
};

export const deleteCourse = async (req, res) => {
  const course = await Courses.findByIdAndDelete(req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ msg: `${course.className} deleted successfully` });
};
