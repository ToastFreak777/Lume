import { fetchWithAuth } from "./apiUtils";

export const userService = {
  getAll: () => fetchWithAuth("/users"),
  getInstructors: () => fetchWithAuth("/users?role=instructor"),
  getStudents: () => fetchWithAuth("/users?role=student"),
};
