import { StatusCodes } from "http-status-codes";
import { createCustomError } from "../errors/custom-error.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(createCustomError("Invalid token", StatusCodes.UNAUTHORIZED));
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { id: payload.userId, isAdmin: payload.isAdmin };
  next();
};

export default authMiddleware;
