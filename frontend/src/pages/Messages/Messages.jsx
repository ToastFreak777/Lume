import { useEffect, useState } from "react";
import { NavLink, useSearchParams, useLoaderData } from "react-router";

import { Profile } from "../../components";

import styles from "./Messages.module.css";
const TAGS = [
  { id: "All", label: "All" },
  { id: "Instructor", label: "Instructors" },
  { id: "Student", label: "Students" },
];

const Messages = () => {
  const users = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredUsers, setFilteredUsers] = useState(users);

  const getFilter = (filter) => {
    const currentFilter = searchParams.get("filter");
    return `${styles.tag} ${currentFilter === filter ? styles.active : ""}`;
  };
  // console.log(filteredUsers);

  useEffect(() => {
    const filter = searchParams.get("filter");
    // console.log(filter);

    if (filter === "All" || !filter) setFilteredUsers(users);
    else setFilteredUsers(users.filter((user) => user.role === filter));
  }, [searchParams]);

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
        {filteredUsers.map((user) => (
          <Profile
            className={styles.profile}
            key={user._id}
            user={user}
            id={Math.floor(Math.random() * 99 + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Messages;
