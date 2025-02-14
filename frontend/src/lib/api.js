const BASE_URL = "http://localhost:8080/api";

export const registerUser = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.msg);
    error.data = errorData.stack;
    throw error;
  }

  return await response.json();
};

export const loginUser = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.msg);
    error.data = errorData.stack;
    throw error;
  }

  return await response.json();
};

export const logoutUser = async () => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.msg);
    error.data = errorData.stack;
    throw error;
  }

  return await response.json();
};

export const verifyAuth = async () => {
  const response = await fetch(`${BASE_URL}/auth/verify`, {
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.msg);
    error.data = errorData.stack;
    throw error;
  }

  return await response.json();
};
