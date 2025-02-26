import styles from "./Courses.module.css";

import { useContext, useState, useEffect } from "react";
import { NavLink, useSearchParams, useLoaderData } from "react-router";

import { AuthContext, SocketContext } from "../../context/store";
import { courseService } from "../../services/courseService";
import { formatDateToMMDDYYY } from "../../util/helpers";

const Courses = () => {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
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
      // Don't need to pass in userId its stored in cookie and sent with request
      // this is just for if there was an admin dashboard
      await courseService.enroll(courseId, currentUser._id);

      setCourses(
        courses.map((course) => {
          if (course._id === courseId) {
            const newCourse = {
              ...course,
              enrolledStudents: [...course.enrolledStudents, currentUser._id],
            };
            return newCourse;
          }
          return course;
        })
      );

      socket.emit("enrolled", { courseId });
    } catch (error) {
      console.error(`Error message: ${error.message}`);
      console.error(error.data);
      console.info(error);
    }
  };

  const dropCourse = async (courseId) => {
    try {
      await courseService.drop(courseId, currentUser._id);

      setCourses(
        courses.map((course) => {
          if (course._id === courseId) {
            const newCourse = {
              ...course,
              enrolledStudents: course.enrolledStudents.filter(
                (id) => id !== currentUser._id
              ),
            };
            return newCourse;
          }
          return course;
        })
      );

      socket.emit("dropped", { courseId });
    } catch (error) {
      console.error(`Error message: ${error.message}`);
      console.error(error.data);
      console.info(error);
    }
  };

  useEffect(() => {
    socket.on("refresh", async ({ courseId }) => {
      console.log("refreshing courses", courseId);
      const course = await courseService.getCourse(courseId);
      setCourses(
        courses.map((old_course) =>
          old_course._id === course._id ? course : old_course
        )
      );
    });

    return () => {
      socket.off("refresh");
    };
  }, [socket, courses]);

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
