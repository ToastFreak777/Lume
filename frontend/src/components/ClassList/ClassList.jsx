import styles from "./ClassList.module.css";

import { classes } from "../../util/classes.json";

const ClassList = () => {
  const checkField = (field) => {
    return field === null ? "-" : field;
  };

  const calculateGrade = (total) => {
    if (total === null) return "gray";
    if (total >= 80) return "hsl(91, 94%, 93%)";
    if (total >= 70) return "hsl(16, 100%, 95%)";
    if (total <= 40) return "hsl(294, 83%, 95%)";
    return "";
  };

  return (
    <div className={styles.classList}>
      <div className={styles.classListHeader}>
        <p>Class Name</p>
        <p>Homework</p>
        <p>Mid Term</p>
        <p>Quizzes</p>
        <p>Final Exam</p>
        <p>Total</p>
      </div>
      {classes.map((c, i) => (
        <div className={styles.classes} key={i}>
          <p className={styles.className}>{c.name}</p>
          <p className={styles.homework}>{checkField(c.homework)}</p>
          <p className={styles.midTerm}>{checkField(c.midTerm)}</p>
          <p className={styles.quizzes}>{checkField(c.quizzes)}</p>
          <p className={styles.finalExam}>{checkField(c.finalExam)}</p>
          <p
            className={styles.total}
            style={{ backgroundColor: calculateGrade(c.total) }}
          >
            {checkField(c.total)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ClassList;
