import {
  MdNotificationsNone,
  MdOutlineEmail,
  MdOutlineSearch,
} from "react-icons/md";

import styles from "./Searchbar.module.css";

import { useLocation } from "react-router";

const Searchbar = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {pathname === "/" ? "Overview" : pathname.split("/")[1]}
      </h1>
      <div className={`${styles["searchbar-container"]}`}>
        {(pathname === "/courses" || pathname === "/grades") && (
          <div className={styles.searchbar}>
            <MdOutlineSearch />
            <input className={styles.search} type="text" placeholder="Search" />
          </div>
        )}
        <div className={styles.notifications}>
          <MdNotificationsNone />
          <MdOutlineEmail />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
