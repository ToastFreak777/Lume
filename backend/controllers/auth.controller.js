import { StatusCodes } from "http-status-codes";
import User from "../models/users.model.js";
import { createCustomError } from "../errors/custom-error.js";

export const register = async (req, res, next) => {
  const { role, first_name, last_name, email, password } = req.body;

  if (!role || !first_name || !last_name || !email || !password) {
    return next(
      createCustomError(
        "Please fill in all required fields",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const user = await User.create(req.body);

  // generate token and save
  const token = user.generateToken();

  res.status(StatusCodes.CREATED).json({ token });
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

  const user = await User.findOne({ email });

  if (!user) {
    return next(
      createCustomError("Invalid credentials", StatusCodes.UNAUTHORIZED)
    );
  }

  const isPasswordCorrect = await user.verifyToken(password);

  if (!isPasswordCorrect) {
    return next(
      createCustomError("Invalid credentials", StatusCodes.UNAUTHORIZED)
    );
  }

  const token = user.generateToken();

  res.status(StatusCodes.OK).json({ token });
};
export const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "User logged out successfully",
  });
};
