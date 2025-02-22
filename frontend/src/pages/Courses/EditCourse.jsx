import { useNavigate, useLoaderData } from "react-router";

import { courseService } from "../../services/courseService";
import {
  calculateAcademicYear,
  formatDateToYYYYMMDD,
} from "../../util/helpers";
import { CourseForm } from "../../components/Forms";
import { useState } from "react";

const EditCourse = () => {
  const { instructors, subjects, course } = useLoaderData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: course._id,
    name: course.name,
    instructor: course.instructor,
    instructorName: `${course.instructor.firstName} ${course.instructor.lastName}`,
    subject: course.subject._id,
    subjectName: course.subject.name,
    subjectAbbreviation: course.subject.abbreviation,
    level: course.level,
    semester: course.semester,
    credits: course.credits,
    startDate: formatDateToYYYYMMDD(course.startDate),
    endDate: formatDateToYYYYMMDD(course.endDate),
    capacity: course.capacity,
    preRequisites: course.preRequisites.toString(),
    format: course.format,
    description: course.description,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const academicYear = calculateAcademicYear(
      formData.startDate,
      formData.endDate,
      formData.semester
    );
    const payload = {
      ...formData,
      academicYear,
      classCode: `${formData.subjectAbbreviation}-${formData.level}`,
      preRequisites:
        formData.preRequisites?.split(",").map((item) => item.trim()) || [],
    };

    try {
      console.log(payload);
      await courseService.update(payload);
      navigate("/courses");
    } catch (error) {
      console.error(`Error message: ${error.message}`);
      console.error(error.data);
      console.info(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <CourseForm
      formData={formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      setFormData={setFormData}
      instructors={instructors}
      subjects={subjects}
      title={"Edit"}
    />
  );
};

export default EditCourse;
