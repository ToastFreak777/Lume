import { useLoaderData } from "react-router";

import { Dashboard, Calendar } from "../../components";

import styles from "./Home.module.css";

const Home = () => {
  const { courses: userCourses } = useLoaderData();

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Dashboard userCourses={userCourses} />
        <Calendar />
      </div>
    </div>
  );
};

export default Home;
