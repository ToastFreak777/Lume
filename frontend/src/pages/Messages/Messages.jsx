import { NavLink, useSearchParams } from "react-router";

import { Profile } from "../../components";

import styles from "./Messages.module.css";

const TAGS = [
  { id: "All", label: "All" },
  { id: "Instructors", label: "Instructors" },
  { id: "Students", label: "Students" },
];

const profiles = Array(8).fill(null);

const Messages = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getFilter = (filter) => {
    const currentFilter = searchParams.get("filter");
    return `${styles.tag} ${currentFilter === filter ? styles.active : ""}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.tags}>
        {TAGS.map((tag) => (
          <NavLink
            key={tag.id}
            to={`/messages?filter=${tag.id}`}
            className={getFilter(tag.id)}
          >
            {tag.label}
          </NavLink>
        ))}
      </div>

      <div className={styles.profiles}>
        {profiles.map((profile) => (
          <Profile className={styles.profile} key={profile} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
