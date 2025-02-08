import styles from "./Card.module.css";
const Card = ({ card }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img
          src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
          alt="class_picture"
        />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{card.ClassName}</h2>
        <p className={styles.cardSubtitle}>{card.Subtitle}</p>
        <p className={styles.cardSchedule}>{card.schedule}</p>
        <p className={styles.cardCapacity}>{card.capacity} students</p>
        <p className={styles.cardInstructor}>Instructor: {card.instructor}</p>
      </div>
    </div>
  );
};

export default Card;
