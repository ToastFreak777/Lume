import { CustomAPIError } from "../errors/custom-error.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      msg: err.message,
      ...(process.env.NODE_ENV === "DEVELOPMENT" && { stack: err.stack }),
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      msg: Object.values(err.errors)
        .map((e) => e.message)
        .join(", "),
    });
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({
      msg: `Duplicate value entered for ${Object.keys(err.keyValue)} field`,
    });
  }

  return res.status(500).json({
    msg: "Something went wrong",
    ...(process.env.NODE_ENV === "DEVELOPMENT" && { stack: err.stack }),
  });
};

export default errorHandler;
