import { createCustomError } from "../errors/custom-error";

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createCustomError("No token provided", StatusCodes.UNAUTHORIZED);
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload._id, name: payload.first_name };
    next();
  } catch (error) {
    throw createCustomError(
      "Not authorized to access this route",
      StatusCodes.UNAUTHORIZED
    );
  }
};

export default authenticationMiddleware;
