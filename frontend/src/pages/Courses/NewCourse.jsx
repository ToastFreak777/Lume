import {useNavigate, useLoaderData} from "react-router";

import {courseService} from "../../services/courseService";
import {calculateAcademicYear,} from "../../util/helpers";
import {CourseForm} from "../../components/Forms";
import {useState} from "react";

const NewCourse = () => {
    const {instructors, subjects} = useLoaderData();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        instructor: "",
        instructorName: "",
        subject: "",
        subjectName: "",
        subjectAbbreviation: "",
        level: 0,
        semester: "Fall",
        credits: 1,
        startDate: "",
        endDate: "",
        capacity: 0,
        preRequisites: "",
        format: "",
        description: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const academicYear = calculateAcademicYear(
            formData.startDate,
            formData.endDate,
            formData.semester
        );

        const startDate = `${formData.startDate}T00:00:00`
        const endDate = `${formData.endDate}T00:00:00`

        const payload = {
            ...formData,
            academicYear,
            startDate,
            endDate,
            classCode: `${formData.subjectAbbreviation}-${formData.level}`,
            preRequisites:
                formData.preRequisites?.split(",").map((item) => item.trim()) || [],
        };

        try {
            // console.log(payload);
            await courseService.create(payload);
            navigate("/courses");
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            console.error(error.data);
            console.error(error);
        }
    };

    const handleChange = (e) => {
        let {name, value} = e.target;

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
            title={"Create"}
        />
    );
};

export default NewCourse;
