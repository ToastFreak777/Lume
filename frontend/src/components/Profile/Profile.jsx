import styles from "./Profile.module.css";

import { MdOutlineEmail } from "react-icons/md";

const profile = {
  avatar: "https://i.pravatar.cc/150?img=1",
  name: "John Doe",
  email: "john.doe@gmail.com",
};

const Profile = ({ user, className, id }) => {
  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.userInfo}>
        <img
          src={`https://randomuser.me/api/portraits/${
            user.gender === "female" ? "women" : "men"
          }/${id}.jpg`}
          alt={profile.name}
        />
        <p className={styles.name}>
          {user.firstName} {user.lastName}
        </p>
        <p className={styles.email}>{user.email}</p>
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
