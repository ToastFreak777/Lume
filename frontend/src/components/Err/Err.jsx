import { useRouteError } from "react-router";

import styles from "./Err.module.css";

const Err = () => {
  const error = useRouteError();

  console.log(error);

  return (
    <h1 className={styles.heading}>
      {error.message ? error.message : "Oops! Something went wrong"}
    </h1>
  );
};

export default Err;
