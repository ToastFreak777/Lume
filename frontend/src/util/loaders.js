import { courseService, userService } from "../services";

export const courseLoader = async () => {
  const response = await courseService.getCourses();
  return response;
};

export const newCourseLoader = async () => {
  const instructors = await userService.getInstructors();
  const subjects = await courseService.getSubjects();
  return {
    instructors,
    subjects,
  };
};
