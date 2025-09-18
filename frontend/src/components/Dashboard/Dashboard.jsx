import styles from "./Dashboard.module.css";

import { Card } from "../index";

const Dashboard = ({ courses }) => {
  return (
    <main className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.classes}>
          {courses.length > 0 ? (
            courses
              .slice(0, 4)
              .map((course) => (
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
