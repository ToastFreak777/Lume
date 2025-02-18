export const BASE_URL = "http://localhost:8080/api";

export const fetchWithAuth = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.msg);
    error.data = errorData.stack;
    throw error;
  }

  return await response.json();
};
