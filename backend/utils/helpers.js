export const validateFields = (
  requiredFields,
  payload,
  next,
  customError,
  statusCode
) => {
  const errors = [];

  // Dynamically validate each field
  for (const [field, message] of Object.entries(requiredFields)) {
    if (!payload[field]) errors.push(`${message} is missing`);
  }

  if (errors.length > 0) {
    next(customError(errors.join(", "), statusCode));
    return false;
  }

  return true;
};
