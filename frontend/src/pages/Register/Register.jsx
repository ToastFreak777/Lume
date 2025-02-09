import styles from "./Register.module.css";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <svg viewBox="0 0 24 24" className={styles.logoIcon}>
            <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z" />
          </svg>
          <h1>Student Registration</h1>
        </div>
        <p className={styles.subtitle}>
          Create your student account to get started
        </p>

        <form className={styles.form}>
          <div className={styles.nameGroup}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" placeholder="John" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" placeholder="Doe" required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              placeholder="Enter your student ID"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">School Email</label>
            <input
              type="email"
              id="email"
              placeholder="student.name@school.edu"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Create Student Account
          </button>
        </form>

        <p className={styles.login}>
          Already enrolled?
          <Link to="/form/login"> Sign in to your account</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
