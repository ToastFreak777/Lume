import { formatDateToMMDDYYY } from "../../util/helpers";

import styles from "./Card.module.css";
const Card = ({ card, className }) => {
  console.log(card);

  card.startDate = formatDateToMMDDYYY(card.startDate);
  card.endDate = formatDateToMMDDYYY(card.endDate);

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardImage}>
        <img
          className={styles.image}
          src="https://picsum.photos/id/238/300/200"
          // src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
          alt="class_picture"
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardInfo}>
          <h2 className={styles.cardTitle}>{card.name}</h2>
          <p className={styles.cardSubtitle}>{card.classCode}</p>
        </div>
        <div className={styles.cardDetails}>
          <p className={styles.cardSchedule}>
            {card.startDate}-{card.endDate}
          </p>
          <p className={styles.cardCapacity}>
            students: {card.enrolledStudents.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
