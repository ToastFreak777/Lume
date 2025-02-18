import { StatusCodes } from "http-status-codes";
import Subjects from "../models/subjects.model.js";
import { createCustomError } from "../errors/custom-error.js";

export const getSubjects = async (req, res) => {
  const subjects = await Subjects.find().lean();
  res.status(StatusCodes.OK).json(subjects);
};

export const getSubject = async (req, res) => {
  const subject = await Subjects.findById(req.params.id).lean();
  res.status(StatusCodes.OK).json(subject);
};

export const addSubject = async (req, res, next) => {
  const { name, abbreviation } = req.body;

  if (!name || !abbreviation) {
    return next(
      createCustomError(
        "Please provide all required fields",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const subject = await Subjects.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: `${subject.name} created` });
};

export const updateSubject = async (req, res) => {
  await Subjects.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "Subject updated" });
};

export const deleteSubject = async (req, res) => {
  const subject = await Subjects.findByIdAndDelete(req.params.id).lean();
  res.status(StatusCodes.OK).json({ msg: `${subject.name} deleted` });
};
