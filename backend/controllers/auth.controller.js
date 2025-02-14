import { StatusCodes } from "http-status-codes";
import User from "../models/users.model.js";
import { createCustomError } from "../errors/custom-error.js";
import ms from "ms";

export const register = async (req, res, next) => {
  const { role, firstName, lastName, email, password, phone, dob, gender } =
    req.body;

  // Validate required fields with specific messages
  if (!role) {
    return next(createCustomError("Role is required", StatusCodes.BAD_REQUEST));
  }
  if (!firstName) {
    return next(
      createCustomError("First name is required", StatusCodes.BAD_REQUEST)
    );
  }
  if (!lastName) {
    return next(
      createCustomError("Last name is required", StatusCodes.BAD_REQUEST)
    );
  }
  if (!email) {
    return next(
      createCustomError("Email is required", StatusCodes.BAD_REQUEST)
    );
  }
  if (!password) {
    return next(
      createCustomError("Password is required", StatusCodes.BAD_REQUEST)
    );
  }
  if (!dob) {
    return next(
      createCustomError("Date of Birth is required", StatusCodes.BAD_REQUEST)
    );
  }
  if (!gender) {
    return next(
      createCustomError("Gender is required", StatusCodes.BAD_REQUEST)
    );
  }
  if (!phone) {
    return next(
      createCustomError("Phone number is required", StatusCodes.BAD_REQUEST)
    );
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        createCustomError("Email already registered", StatusCodes.CONFLICT)
      );
    }

    await User.create(req.body);

    res.status(StatusCodes.CREATED).json({ msg: "Registration successful" });
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(
        createCustomError(messages.join(". "), StatusCodes.BAD_REQUEST)
      );
    }
    // Handle other errors
    return next(
      createCustomError(
        "Registration failed",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
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
      // secure: true,
      maxAge: ms(process.env.JWT_EXPIRE_TIME),
    })
    .status(StatusCodes.OK)
    .json({ msg: "Login successful" });
};

export const verify = async (req, res, next) => {
  if (!req.user) {
    return next(
      createCustomError("User not authenticated", StatusCodes.UNAUTHORIZED)
    );
  }

  const user = await User.findById(req.user.userId).select("-password");

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
