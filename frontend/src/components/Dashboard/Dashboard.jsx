import styles from "./Dashboard.module.css";

import { Card } from "../index";
import { MdNoEncryption } from "react-icons/md";

const Dashboard = ({ userCourses }) => {
  const cards = [
    {
      ClassName: "English 101",
      Subtitle: "some text",
      schedule: "Monday 11 AM",
      capacity: 10,
      instructor: "John Doe",
    },
    {
      ClassName: "English 101",
      Subtitle: "some text",
      schedule: "Monday 11 AM",
      capacity: 10,
      instructor: "John Doe",
    },
    {
      ClassName: "English 101",
      Subtitle: "some text",
      schedule: "Monday 11 AM",
      capacity: 10,
      instructor: "John Doe",
    },
    {
      ClassName: "English 101",
      Subtitle: "some text",
      schedule: "Monday 11 AM",
      capacity: 10,
      instructor: "John Doe",
    },
  ];

  // console.log(userCourses);
  // userCourses = [];

  return (
    <main className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.classes}>
          {userCourses.length > 0 ? (
            userCourses.map((course) => (
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
