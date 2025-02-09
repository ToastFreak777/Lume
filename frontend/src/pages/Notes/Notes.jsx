import styles from "./Notes.module.css";

import { IoSaveOutline , IoCloudDownloadOutline } from "react-icons/io5";

const Notes = () => {
  return (
    <div className={styles.container}>
      <div className={styles.notes}>
        <div className={styles.notesHeaderContainer}>
          <div className={styles.notesHeader}>
            <h2 className={styles.notesTitle}>notes for science basic</h2>
            <div className={styles.notesIcons}>
              <IoSaveOutline  />
              <IoCloudDownloadOutline />
            </div>
          </div>
          <div className={styles.profile}>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="profile-pic"
            />
            <p>
              John Doe <span className={styles.role}>(Instructor)</span>
            </p>
          </div>
        </div>
        <div className={styles.notesContent}>
          <textarea
            className={styles.textarea}
            placeholder="Add a note..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Notes;
