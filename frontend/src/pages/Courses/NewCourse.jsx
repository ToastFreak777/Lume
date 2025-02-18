import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router";
import styles from "./NewCourse.module.css";

import { courseService } from "../../services/courseService";
import { calculateAcademicYear } from "../../util/helpers";

const NewCourse = () => {
  const { instructors, subjects } = useLoaderData();
  const navigate = useNavigate();

  // Only keep search and dropdown states
  const [instructorSearch, setInstructorSearch] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [filteredInstructors, setFilteredInstructors] = useState(instructors);
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [showInstructorDropdown, setShowInstructorDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);

  // Filter effects remain the same
  useEffect(() => {
    const filtered = instructors.filter((instructor) =>
      instructor.firstName
        .toLowerCase()
        .includes(instructorSearch.toLowerCase())
    );
    setFilteredInstructors(filtered);
  }, [instructorSearch, instructors]);

  useEffect(() => {
    const filtered = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(subjectSearch.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }, [subjectSearch, subjects]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const semester = formData.get("semester");

    const academicYear = calculateAcademicYear(startDate, endDate, semester);

    const courseData = {
      name: formData.get("name"),
      subject: formData.get("subject"),
      semester: semester,
      classCode: `${formData.get("subject")}-${formData.get("level")}`,
      credits: formData.get("credits"),
      capacity: formData.get("capacity"),
      description: formData.get("description"),
      preRequisites:
        formData
          .get("preRequisites")
          ?.split(",")
          .map((item) => item.trim()) || [],
      instructorId: formData.get("instructorId"),
      level: formData.get("level"),
      startDate: startDate,
      endDate: endDate,
      academicYear: academicYear,
    };

    try {
      await courseService.create(courseData);
      navigate("/courses");
    } catch (error) {
      console.error(`Error message: ${error.message}`);
      console.error(error.data);
      console.info(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>New Course</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Course Name:</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="instructorId">Instructor:</label>
            <div className={styles.dropdownContainer}>
              <input
                type="text"
                value={instructorSearch}
                onChange={(e) => {
                  setInstructorSearch(e.target.value);
                  setShowInstructorDropdown(true);
                }}
                onFocus={() => setShowInstructorDropdown(true)}
                placeholder="Search instructor..."
              />
              <input type="hidden" name="instructorId" id="instructorId" />
              {showInstructorDropdown && (
                <div className={styles.dropdownList}>
                  {filteredInstructors.map((instructor) => (
                    <div
                      key={instructor._id}
                      className={styles.dropdownItem}
                      onClick={() => {
                        document.getElementById("instructorId").value =
                          instructor._id;
                        setInstructorSearch(
                          `${instructor.firstName} ${instructor.lastName}`
                        );
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
                value={subjectSearch}
                onChange={(e) => {
                  setSubjectSearch(e.target.value);
                  setShowSubjectDropdown(true);
                }}
                onFocus={() => setShowSubjectDropdown(true)}
                placeholder="Search subject..."
              />
              <input type="hidden" name="subject" id="subject" />
              {showSubjectDropdown && (
                <div className={styles.dropdownList}>
                  {filteredSubjects.map((subject) => (
                    <div
                      key={subject._id}
                      className={styles.dropdownItem}
                      onClick={() => {
                        document.getElementById("subject").value = subject._id;
                        setSubjectSearch(subject.name);
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
            <input type="number" id="level" name="level" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="semester">Semester:</label>
            <select id="semester" name="semester" required>
              <option value="Fall">Fall</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="credits">Credits:</label>
            <input type="number" id="credits" name="credits" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" name="startDate" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" name="endDate" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="capacity">Capacity:</label>
            <input type="number" id="capacity" name="capacity" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="preRequisites">Prerequisites:</label>
            <input
              type="text"
              id="preRequisites"
              name="preRequisites"
              placeholder="CS101, CS102 (comma separated)"
            />
          </div>

          <div className={`${styles.formGroup} ${styles.description}`}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className={styles.textarea}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Create
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

export default NewCourse;
