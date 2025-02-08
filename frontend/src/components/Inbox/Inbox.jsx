import styles from "./Inbox.module.css";

import { FaArrowRight } from "react-icons/fa";

const Inbox = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Inbox</h2>
      <div className={styles.card}>
        <h3 className={styles.title}>Message Title</h3>
        <p className={styles.message}>
          {/* Message str.slice(1, 50) */}
          message body
        </p>
      </div>
      <button className={styles.link}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Inbox;
