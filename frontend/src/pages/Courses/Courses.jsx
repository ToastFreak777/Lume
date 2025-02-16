import styles from "./Courses.module.css";

import { NavLink, useSearchParams } from "react-router";

const COURSE_LIST = [
  { id: "CS226", label: "CS226" },
  { id: "CS237", label: "CS237" },
  { id: "CS9800", label: "CS9800" },
  { id: "CS10687", label: "CS10687" },
];

import { courses } from "../../util/courses.json";

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getCourseName = (course) => {
    const currentCourse = searchParams.get("course");
    return `${styles.course} ${currentCourse === course ? styles.active : ""}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.courses}>
        {COURSE_LIST.map(({ id, label }) => (
          <NavLink
            key={id}
            to={`/courses?course=${id}`}
            className={getCourseName(id)}
          >
            {label}
          </NavLink>
        ))}
      </div>

      <div className={styles.classList}>
        <div className={styles.classListHeader}>
          <p>Class Name</p>
          <p>Start Date</p>
          <p>End Date</p>
          <p>Instructor</p>
          <p>Type</p>
          <p>Capacity</p>
        </div>
        {courses.map((c, i) => (
          <div className={styles.classes} key={i}>
            <p className={styles.className}>{c.name}</p>
            <p className={styles.startDate}>{c.startDate}</p>
            <p className={styles.endDate}>{c.endDate}</p>
            <p className={styles.instructor}>{c.instructor.name}</p>
            <p className={styles.type}>{c.type}</p>
            <p className={styles.capacity}>
              {c.capacity.enrolled}/{c.capacity.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
