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
  getCourse: (id) => fetchWithAuth(`/courses/${id}`),
  getSubjects: () => fetchWithAuth("/subjects"),
  delete: (courseId) =>
    fetchWithAuth(`/courses/${courseId}`, { method: "DELETE" }),
};
