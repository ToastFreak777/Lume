import styles from "./Day.module.css";

const Day = ({ assignment }) => {
  console.log(assignment);

  return (
    <>
      {assignment?.id ? (
        <div
          className={`${styles.box} ${styles[assignment.subject]}`}
          // style={{ backgroundColor: assignment.color }}
        >
          <p
            className={`${styles.day} ${styles[assignment.subject]} ${
              styles.dayNumber
            }`}
            // style={{
            //   backgroundColor: "white",
            // }}
          >
            {assignment.day}
          </p>
          <div className={styles.info}>
            <p className={styles.name}>{assignment.name}</p>
            <p className={styles.courseCode}>{assignment.courseCode}</p>
            <p className={styles.dueDate}>{assignment.dueDate}</p>
          </div>
        </div>
      ) : (
        <div className={styles.box}>{assignment.day}</div>
      )}
    </>
  );
};

export default Day;
