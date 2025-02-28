import {Calendar, Dashboard, Loading} from "../../components";

import styles from "./Home.module.css";
import {assignmentService, courseService} from "../../services/index.js";
import {useEffect, useState} from "react";

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchUserCourses = async () => {
            setIsLoading(true);
            try {
                const data = await courseService.getAllCoursesOfUser();
                const assignments = await assignmentService.getAssignmentsFromCourse(data.courses)
                setCourses(data.courses);
                setAssignments(assignments);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        fetchUserCourses();
    }, [setIsLoading]);


    if (isLoading) return <Loading/>;

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <Dashboard courses={courses}/>
                <Calendar assignments={assignments}/>
            </div>
        </div>
    );
};

export default Home;
