import styles from "./Day.module.css";
import PropTypes from "prop-types";

const Day = ({assignment, day}) => {

    return (
        <>
            {assignment?._id ? (
                <div className={`${styles.box} ${styles[assignment.type]}`}>
                    <div className={styles.dayBox}>
                        <p className={`${styles.day} ${styles[assignment.type]} ${styles.dayNumber}`}>
                            {day}
                        </p>
                        <p className={`${styles.day} ${styles[assignment.type]} ${styles.type}`}>
                            {assignment.type}
                        </p>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.name}>{assignment.name}</p>
                        <p className={styles.courseCode}>{assignment.courseCode}</p>
                        <p className={styles.dueDate}>{assignment.course.classCode}</p>
                    </div>
                </div>
            ) : (
                <div className={`${styles.box} ${styles.dayNumber}`}>{day}</div>
            )}
        </>
    );
};

Day.propTypes = {
    assignment: PropTypes.shape({
        id: PropTypes.string,
        subject: PropTypes.string,
        day: PropTypes.number,
        name: PropTypes.string,
        courseCode: PropTypes.string,
        dueDate: PropTypes.string,
    }),
};

export default Day;
