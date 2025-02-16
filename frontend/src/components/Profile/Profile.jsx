import styles from "./Profile.module.css";

import { MdOutlineEmail } from "react-icons/md";

const profile = {
  avatar: "https://i.pravatar.cc/150?img=1",
  name: "John Doe",
  email: "john.doe@gmail.com",
};

const Profile = ({ className }) => {
  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.userInfo}>
        <img src={profile.avatar} alt={profile.name} />
        <p className={styles.name}>{profile.name}</p>
        <p className={styles.email}>{profile.email}</p>
      </div>

      <div className={styles.actions}>
        <button>
          <MdOutlineEmail />
        </button>
      </div>
    </div>
  );
};

export default Profile;
