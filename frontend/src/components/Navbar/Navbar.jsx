import { NavLink } from "react-router";

import useAuth from "../../hooks/useAuth";

import styles from "./Navbar.module.css";

import { FaTasks } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const { currentUser, handleLogout } = useAuth();

  const toggleActive = ({ isActive }) =>
    `${styles["tabs"]} ${styles["flex-group"]} ${
      isActive ? styles.active : ""
    }`;

  const tabs = ["overview", "courses", "grades", "messages", "notes"];
  const icons = [
    <FaTasks key="tasks" />,
    <SiGoogleclassroom key="classroom" />,
    <FaCheckCircle key="check" />,
    <FaChalkboardTeacher key="teacher" />,
    <CgNotes key="notes" />,
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles["nav-menu"]}>
        <div className={styles["menu-profile"]}>
          <img
            className={styles["profile-pic"]}
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profile-pic"
          />
          <div className={styles["profile-info"]}>
            <p className={styles["profile-user-name"]}>
              {currentUser?.firstName} {currentUser?.lastName}
            </p>
            <p className={styles["profile-user-email"]}>{currentUser?.email}</p>
          </div>
        </div>

        <div className={styles["menu-tabs"]}>
          {tabs.map((tab, i) => (
            <NavLink
              key={tab}
              to={`/${tab == "overview" ? "" : tab}`}
              className={toggleActive}
            >
              {icons[i]}
              <p>{tab}</p>
            </NavLink>
          ))}
        </div>
      </div>
      <div className={styles["nav-footer"]}>
        {/* <NavLink to="/settings" className={toggleActive}>
          <MdOutlineSettings />
          <p>Settings</p>
        </NavLink> */}
        <NavLink
          to=""
          className={`${styles["flex-group"]}`}
          onClick={handleLogout}
        >
          <MdLogout />
          <p>Log out</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
