import { StatusCodes } from "http-status-codes";
import { createCustomError } from "../errors/custom-error.js";

const isAdminAuth = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      createCustomError(
        "You are not authorized to perform this action",
        StatusCodes.FORBIDDEN
      )
    );
  }
  next();
};

export default isAdminAuth;
