import { CustomAPIError } from "../errors/custom-error.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      msg: err.message,
      stack: process.env.NODE_ENV === "PRODUCTION" ? null : err.stack,
    });
  }
  return res.status(500).json({ msg: "Something went wrong" });
};

export default errorHandler;
