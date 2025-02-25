import { StatusCodes } from "http-status-codes";
import Courses from "../models/courses.model.js";
import User from "../models/users.model.js";
import { createCustomError } from "../errors/custom-error.js";

export const getCourses = async (req, res) => {
  const courses = await Courses.find().populate("instructor");

  res.status(StatusCodes.OK).json(courses);
};

export const getCourse = async (req, res) => {
  const course = await Courses.findById(req.params.id).populate([
    "instructor",
    "subject",
  ]);

  res.status(StatusCodes.OK).json(course);
};

export const addCourse = async (req, res, next) => {
  const {
    name,
    instructor,
    subject,
    level,
    format,
    semester,
    startDate,
    endDate,
    classCode,
    credits,
    capacity,
  } = req.body;

  if (
    !name ||
    !instructor ||
    !subject ||
    !level ||
    !format ||
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

export const enrollStudent = async (req, res, next) => {
  const { id: courseId } = req.params;
  // const { studentId } = req.body;
  const studentId = req.user.id;

  const student = await User.findById(studentId);

  if (!student)
    return next(createCustomError("Student not found", StatusCodes.NOT_FOUND));

  const course = await Courses.findByIdAndUpdate(courseId, {
    $addToSet: { enrolledStudents: studentId },
  });

  if (!course)
    return next(createCustomError("Course not found", StatusCodes.NOT_FOUND));

  res.status(StatusCodes.OK).json({ msg: "Student enrolled successfully" });
};

export const dropCourse = async (req, res, next) => {
  const { id: courseId } = req.params;
  // const { studentId } = req.body;
  const studentId = req.user.id;

  const student = await User.findById(studentId);

  if (!student)
    return next(createCustomError("Student not found", StatusCodes.NOT_FOUND));

  const course = await Courses.findByIdAndUpdate(courseId, {
    $pull: { enrolledStudents: studentId },
  });

  if (!course)
    return next(createCustomError("Course not found", StatusCodes.NOT_FOUND));

  res.status(StatusCodes.OK).json({ msg: "Course dropped..." });
};
