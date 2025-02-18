import { fetchWithAuth } from "./apiUtils";

export const authService = {
  register: (formData) =>
    fetchWithAuth("/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    }),

  login: (formData) =>
    fetchWithAuth("/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
    }),

  logout: () =>
    fetchWithAuth("/auth/logout", {
      method: "POST",
    }),

  verify: () => fetchWithAuth("/auth/verify"),
};
