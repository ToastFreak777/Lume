import styles from "./Card.module.css";
const Card = ({ card, className }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardImage}>
        <img
          className={styles.image}
          src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
          alt="class_picture"
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardInfo}>
          <h2 className={styles.cardTitle}>{card.ClassName}</h2>
          <p className={styles.cardSubtitle}>{card.Subtitle}</p>
        </div>
        <div className={styles.cardDetails}>
          <p className={styles.cardSchedule}>{card.schedule}</p>
          <p className={styles.cardCapacity}>{card.capacity} students</p>
          <p className={styles.cardInstructor}>Instructor: {card.instructor}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
