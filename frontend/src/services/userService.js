import { fetchWithAuth } from "./apiUtils";

export const userService = {
  getAll: () => fetchWithAuth("/users"),
  getInstructors: () => fetchWithAuth("/users?role=Instructor"),
  getStudents: () => fetchWithAuth("/users?role=Student"),
};
