import styles from "./Navbar.module.css";

import { FaTasks } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const handleClick = (e) => {
    console.log(e.target);
  };

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
            <p className={styles["profile-user-name"]}>John Doe</p>
            <p className={styles["profile-user-email"]}>k.east@student.com</p>
          </div>
        </div>

        <div className={styles["menu-tabs"]}>
          <div
            className={`${styles["overview"]} ${styles["flex-group"]} ${styles["active"]}`}
            name="meeees"
            onClick={handleClick}
          >
            <FaTasks />
            <p>Overview</p>
          </div>
          <div className={`${styles["classes"]} ${styles["flex-group"]} `}>
            <SiGoogleclassroom />
            <p>Classes</p>
          </div>
          <div className={`${styles["grades"]} ${styles["flex-group"]}`}>
            <FaCheckCircle />
            <p>Grades</p>
          </div>
          <div className={`${styles["instructors"]} ${styles["flex-group"]}`}>
            <FaChalkboardTeacher />
            <p>Instructors</p>
          </div>
          <div className={`${styles["notes"]} ${styles["flex-group"]}`}>
            <CgNotes />
            <p>Notes</p>
          </div>
        </div>
      </div>
      <div className={styles["nav-footer"]}>
        <div className={`${styles["settings"]} ${styles["flex-group"]}`}>
          <MdOutlineSettings />
          <p>Settings</p>
        </div>
        <div className={`${styles["logout"]} ${styles["flex-group"]}`}>
          <MdLogout />
          <p>Log out</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
