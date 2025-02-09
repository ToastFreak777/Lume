import { Navbar, Dashboard, Calendar, Sidebar } from "../../components";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      {/* <Navbar /> */}
      <div className={styles.mainContent}>
        <Dashboard />
        <Calendar />
      </div>
      {/* <Sidebar /> */}
    </div>
  );
};

export default Home;
