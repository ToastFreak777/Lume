import { StatusCodes } from "http-status-codes";
import { createCustomError } from "../errors/custom-error.js";

const authorizeUser = async (req, res, next) => {
  const { id } = req.params;

  if (id !== req.user.id && !req.user.isAdmin) {
    return next(
      createCustomError(
        "You are not authorized to perform this action",
        StatusCodes.FORBIDDEN
      )
    );
  }
  next();
};

export default authorizeUser;
