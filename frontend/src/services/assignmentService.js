import {fetchWithAuth} from "./apiUtils.js";

export const assignmentService = {
    getAssignmentsFromCourse: (courses) => {
        const ids = courses.map(course => course._id).join(',')
        const query = `?courseIds=${ids}&sort=dueDate&order=asc`
        return fetchWithAuth(`/assignments/courses${query}`)
    }

};
