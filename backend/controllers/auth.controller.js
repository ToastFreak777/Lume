import { StatusCodes } from "http-status-codes";
import User from "../models/users.model.js";
import { createCustomError } from "../errors/custom-error.js";
import ms from "ms";

import { validateFields } from "../utils/helpers.js";

export const register = async (req, res, next) => {
  const { email } = req.body;

  const requiredFields = {
    role: "Role",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    password: "Password",
    dob: "Date of Birth",
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

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(
      createCustomError("Email already registered", StatusCodes.CONFLICT)
    );
  }

  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Registration successful" });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      createCustomError(
        "Please provide an email and password",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      createCustomError("Invalid credentials", StatusCodes.UNAUTHORIZED)
    );
  }

  const isPasswordCorrect = await user.verifyPassword(password);

  if (!isPasswordCorrect) {
    return next(
      createCustomError("Invalid credentials", StatusCodes.UNAUTHORIZED)
    );
  }

  const token = user.generateToken();

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: ms(process.env.JWT_EXPIRE_TIME),
    })
    .status(StatusCodes.OK)
    .json({ msg: "Login successful" });
};

export const getCredentials = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(createCustomError("User not found", StatusCodes.NOT_FOUND));
  }

  res.status(StatusCodes.OK).json(user);
};

export const logout = async (req, res) => {
  req.user = null;

  res.clearCookie("token", { httpOnly: true }).status(StatusCodes.OK).json({
    msg: "User logged out successfully",
  });
};
