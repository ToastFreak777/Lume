import styles from "./Login.module.css";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <svg viewBox="0 0 24 24" className={styles.logoIcon}>
            <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z" />
          </svg>
          <h1>Student Portal</h1>
        </div>
        <p className={styles.subtitle}>
          Sign in to access your academic dashboard
        </p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Student Email</label>
            <input
              type="email"
              id="email"
              placeholder="student.name@school.edu"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className={styles.options}>
            <label className={styles.remember}>
              <input type="checkbox" />
              Keep me signed in
            </label>
            <a href="#" className={styles.forgot}>
              Reset password
            </a>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Access Dashboard
          </button>
        </form>

        <p className={styles.signup}>
          New student?
          <Link to="/form/register"> Create your account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
