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

export const editCourseLoader = async ({ params }) => {
  const course = await courseService.getCourse(params.id);
  const instructors = await userService.getInstructors();
  const subjects = await courseService.getSubjects();

  return {
    course,
    instructors,
    subjects,
  };
};

export const messageLoader = async () => {
  const users = await userService.getAll();
  return users;
};

export const homeLoader = async () => {
  const userCourses = await courseService.getAllCoursesOfUser();
  return userCourses;
};
