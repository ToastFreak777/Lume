import { fetchWithAuth } from "./apiUtils";

export const courseService = {
  create: (formData) =>
    fetchWithAuth("/courses", {
      method: "POST",
      body: JSON.stringify(formData),
    }),

  update: (formData) =>
    fetchWithAuth(`/courses/${formData.id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    }),

  getCourses: () => fetchWithAuth("/courses"),
  getSubjects: () => fetchWithAuth("/subjects"),
};
