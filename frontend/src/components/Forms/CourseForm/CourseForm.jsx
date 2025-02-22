import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

import styles from "./CourseForm.module.css";

const CourseForm = ({
  formData,
  handleSubmit,
  handleChange,
  setFormData,
  instructors,
  subjects,
  title,
}) => {
  const [filteredInstructors, setFilteredInstructors] = useState(instructors);
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [showInstructorDropdown, setShowInstructorDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const filtered = instructors.filter((instructor) =>
      instructor.firstName
        .toLowerCase()
        .includes(formData.instructorName.toLowerCase())
    );
    setFilteredInstructors(filtered);
  }, [formData.instructorName, instructors]);

  useEffect(() => {
    const filtered = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(formData.subjectName.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }, [formData.subjectName, subjects]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdownContainer")) {
        setShowInstructorDropdown(false);
        setShowSubjectDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{title} Course</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Course Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="instructor">Instructor:</label>
            <div className={styles.dropdownContainer}>
              <input
                type="text"
                name="instructorName"
                value={formData.instructorName}
                autoComplete="off"
                onChange={(e) => {
                  handleChange(e);
                  setShowInstructorDropdown(true);
                }}
                onFocus={() => setShowInstructorDropdown(true)}
                placeholder="Search instructor..."
              />
              {showInstructorDropdown && (
                <div className={styles.dropdownList}>
                  {filteredInstructors.map((instructor) => (
                    <div
                      key={instructor._id}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          instructor: instructor._id,
                          instructorName: `${instructor.firstName} ${instructor.lastName}`,
                        }));
                        setShowInstructorDropdown(false);
                      }}
                    >
                      <div className={styles.primaryText}>
                        {instructor.firstName} {instructor.lastName}
                      </div>
                      <div className={styles.secondaryText}>
                        ID: {instructor._id}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject:</label>
            <div className={styles.dropdownContainer}>
              <input
                type="text"
                value={formData.subjectName}
                name="subjectName"
                autoComplete="off"
                onChange={(e) => {
                  handleChange(e);
                  setShowSubjectDropdown(true);
                }}
                onFocus={() => setShowSubjectDropdown(true)}
                placeholder="Search subject..."
              />
              {showSubjectDropdown && (
                <div className={styles.dropdownList}>
                  {filteredSubjects.map((subject) => (
                    <div
                      key={subject._id}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          subject: subject._id,
                          subjectName: subject.name,
                          subjectAbbreviation: subject.abbreviation,
                        }));
                        setShowSubjectDropdown(false);
                      }}
                    >
                      {subject.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="level">Level:</label>
            <input
              type="number"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="semester">Semester:</label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >
              <option value="Fall">Fall</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="credits">Credits:</label>
            <input
              type="number"
              id="credits"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="capacity">Capacity:</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="preRequisites">Prerequisites:</label>
            <input
              type="text"
              id="preRequisites"
              name="preRequisites"
              placeholder="CS101, CS102 (comma separated)"
              // autoComplete="off"
              value={formData.preRequisites}
              onChange={handleChange}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.format}`}>
            {["In-Person", "Online", "Hybrid"].map((option) => (
              <div className={styles.formatOptions} key={option}>
                <input
                  type="radio"
                  id={option}
                  name="format"
                  value={option}
                  onChange={handleChange}
                  checked={formData.format === option}
                />
                <label htmlFor={option.toLowerCase()}>{option}</label>
              </div>
            ))}
          </div>

          <div className={`${styles.formGroup} ${styles.description}`}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className={styles.textarea}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              {title === "Edit" ? "Save" : title}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import PropTypes from "prop-types";

CourseForm.propTypes = {
  formData: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  instructors: PropTypes.arrayOf(PropTypes.object),
  subjects: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default CourseForm;
