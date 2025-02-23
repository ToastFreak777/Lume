import styles from "./Courses.module.css";

import { useContext, useState } from "react";
import { NavLink, useSearchParams, useLoaderData } from "react-router";

import { AuthContext } from "../../context/AuthContext";
import { courseService } from "../../services/courseService";
import { formatDateToMMDDYYY } from "../../util/helpers";

const Courses = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const courseData = useLoaderData();
  const [courses, setCourses] = useState(courseData);

  const deleteCourse = async (courseId) => {
    try {
      await courseService.delete(courseId);
      setCourses(courses.filter(({ _id }) => _id !== courseId));
    } catch (error) {
      console.error(`Error message: ${error.message}`);
      console.error(error.data);
      console.info(error);
    }
  };

  const enrollStudent = async (courseId) => {
    try {
      await courseService.enroll(courseId, currentUser._id);
    } catch (error) {
      console.error(`Error message: ${error.message}`);
      console.error(error.data);
      console.info(error);
    }
  };

  const dropCourse = async (courseId) => {
    try {
      await courseService.drop(courseId, currentUser._id);
    } catch (error) {
      console.error(`Error message: ${error.message}`);
      console.error(error.data);
      console.info(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.classList}>
        <div className={styles.classListHeader}>
          <p>Class Name</p>
          <p>Start Date</p>
          <p>End Date</p>
          <p>Instructor</p>
          <p>Type</p>
          <p>Capacity</p>
          {currentUser?.role === "Admin" && (
            <NavLink to="/courses/new" className={styles.addButton}>
              Add
            </NavLink>
          )}
        </div>
        {courses.map((course) => (
          <div className={styles.classes} key={course._id}>
            <p className={styles.className}>{course.name}</p>
            <p className={styles.startDate}>
              {formatDateToMMDDYYY(course.startDate)}
            </p>
            <p className={styles.endDate}>
              {formatDateToMMDDYYY(course.endDate)}
            </p>
            <p className={styles.instructor}>
              {course.instructor.firstName} {course.instructor.lastName}
            </p>
            <p className={styles.type}>{course.format}</p>
            <p className={styles.capacity}>
              {course.enrolledStudents.length}/{course.capacity}
            </p>
            {currentUser?.role === "Admin" && (
              <div className={styles.adminButtons}>
                <NavLink
                  to={`/courses/edit/${course._id}`}
                  className={styles.editButton}
                >
                  Edit
                </NavLink>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteCourse(course._id)}
                >
                  Delete
                </button>
              </div>
            )}
            {currentUser?.role === "Student" &&
              (!course.enrolledStudents.includes(currentUser._id) ? (
                <div className={styles.adminButtons}>
                  <button
                    className={styles.editButton}
                    onClick={() => enrollStudent(course._id)}
                  >
                    Enroll
                  </button>
                </div>
              ) : (
                <div className={styles.adminButtons}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => dropCourse(course._id)}
                  >
                    Drop
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
