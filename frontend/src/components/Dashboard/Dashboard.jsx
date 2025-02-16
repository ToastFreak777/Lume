import styles from "./Dashboard.module.css";

import { Card } from "../index";

const Dashboard = () => {
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

  return (
    <main className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.classes}>
          {cards.map((card, index) => (
            <Card key={index} card={card} className={styles.class} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
