import { StatusCodes } from "http-status-codes";
import Classes from "../models/classes.model.js";
import { createCustomError } from "../errors/custom-error.js";

export const getClasses = async (req, res) => {
  const classes = await Classes.find();

  res.status(StatusCodes.OK).json(classes);
};

export const getClass = async (req, res) => {
  const klass = await Classes.findById(req.params.id);

  res.status(StatusCodes.OK).json(klass);
};

export const addClass = async (req, res, next) => {
  const {
    className,
    instructorId,
    subject,
    semester,
    courseCode,
    credits,
    capacity,
  } = req.body;

  if (
    !className ||
    !instructorId ||
    !subject ||
    !semester ||
    !courseCode ||
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

  const klass = await Classes.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ msg: `${klass.className} created successfully` });
};

export const updateClass = async (req, res) => {
  await Classes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "Class updated successfully" });
};

export const deleteClass = async (req, res) => {
  const klass = await Classes.findByIdAndDelete(req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ msg: `${klass.className} deleted successfully` });
};