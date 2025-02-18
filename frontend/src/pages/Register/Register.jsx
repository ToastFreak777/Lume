import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Register.module.css";
import { Link } from "react-router";
import { authService } from "../../services";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    role: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authService.register(formData);
      navigate("/login");
    } catch (error) {
      console.error(`Error message: ${error.message}`);
      console.error(error.data);
    }
  };

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

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.nameGroup}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="gender">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select role</option>
              <option value="Student">Student</option>
              <option value="Parent">Parent</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">School Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="student.name@school.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="0770000000"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Create Student Account
          </button>
        </form>

        <p className={styles.login}>
          Already enrolled?
          <Link to="/login"> Sign in to your account</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
