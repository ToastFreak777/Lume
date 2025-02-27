import styles from "./Dashboard.module.css";
import { useState, useEffect } from "react";

import { Card, Loading } from "../index";
import { courseService } from "../../services";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserCourses = async () => {
      setIsLoading(true);
      try {
        const data = await courseService.getAllCoursesOfUser();
        setCourses(data.courses);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchUserCourses();
  }, [setIsLoading]);

  if (isLoading) return <Loading />;

  return (
    <main className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.classes}>
          {courses.length > 0 ? (
            courses.map((course) => (
              <Card key={course._id} card={course} className={styles.class} />
            ))
          ) : (
            <h2>No Enrolled Courses...</h2>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
