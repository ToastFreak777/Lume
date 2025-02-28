import styles from "./Day.module.css";
import PropTypes from "prop-types";

const Day = ({assignment}) => {


    return (
        <>
            {assignment?.id ? (
                <div className={`${styles.box} ${styles[assignment.subject]}`}>
                    <p className={`${styles.day} ${styles[assignment.subject]} ${styles.dayNumber}`}>
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
