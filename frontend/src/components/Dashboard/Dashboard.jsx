import styles from "./Dashboard.module.css";

import { Card } from "../index";

import {
  MdNotificationsNone,
  MdOutlineEmail,
  MdOutlineSearch,
} from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";

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
      <div className={styles.container}>
        <h1 className={styles.title}>Overview</h1>
        <div className={`${styles["searchbar-container"]}`}>
          <div className={styles.searchbar}>
            <MdOutlineSearch />
            <input className={styles.search} type="text" placeholder="Search" />
          </div>
          <div className={styles.notifications}>
            <MdNotificationsNone />
            <MdOutlineEmail />
            <FiMessageSquare />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.classes}>
          {cards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
