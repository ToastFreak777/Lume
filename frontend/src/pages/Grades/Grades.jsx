import { useEffect, useState } from "react";
import { ClassList } from "../../components";
import styles from "./Grades.module.css";

import { NavLink, useSearchParams } from "react-router";

const SEMESTERS = [
  { id: "fall", label: "Fall 2024" },
  { id: "winter", label: "Winter 2025" },
  { id: "spring", label: "Spring 2025" },
  { id: "summer", label: "Summer 2025" },
];

const Grades = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  const getClassName = (semester) => {
    const currentSemester = searchParams.get("semester");
    return `${styles.semester} ${
      currentSemester === semester ? styles.active : ""
    }`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.semesters}>
        {SEMESTERS.map(({ id, label }) => (
          <NavLink
            key={id}
            to={`/grades?semester=${id}`}
            className={getClassName(id)}
          >
            {label}
          </NavLink>
        ))}
      </div>

      <ClassList />

      <div className={styles.progressContainer}>
        <h2>Progress</h2>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBarItem}>
            <p className={styles.progressBarTitle}>Homework</p>
            <div className={styles.progressBar}>
              <p
                className={styles.innerBar}
                style={{
                  width: isVisible ? "90%" : "0%",
                }}
              ></p>
            </div>
            <div className={styles.progressBarInfo}>
              <p>90/100</p>
              <p>90% done</p>
            </div>
          </div>

          <div className={styles.progressBarItem}>
            <p className={styles.progressBarTitle}>Quizzes</p>
            <div className={styles.progressBar}>
              <p
                className={styles.innerBar}
                style={{ width: isVisible ? "67%" : "0%" }}
              ></p>
            </div>
            <div className={styles.progressBarInfo}>
              <p>14/21</p>
              <p>67% done</p>
            </div>
          </div>

          <div className={styles.progressBarItem}>
            <p className={styles.progressBarTitle}>Exams</p>
            <div className={styles.progressBar}>
              <p
                className={styles.innerBar}
                style={{ width: isVisible ? "71%" : "0%" }}
              ></p>
            </div>
            <div className={styles.progressBarInfo}>
              <p>5/7</p>
              <p>71% done</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;
