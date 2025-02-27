import { Dashboard, Calendar } from "../../components";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Dashboard />
        <Calendar />
      </div>
    </div>
  );
};

export default Home;
