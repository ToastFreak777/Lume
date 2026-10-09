/**
 * @typedef {Object} Course
 * @property {string} _id
 * @property {string} name
 * @property {string} instructor
 * @property {string} subject
 * @property {number} level - The level of the course (e.g., 100, 200, etc.).
 * @property {string} semester - The semester in which the course is offered (e.g., "Fall", "Spring", "Summer").
 * @property {Array<string>} enrolledStudents
 * @property {string} format - The format of the course (e.g., "In-Person", "Online", "Hybrid").
 * @property {Array<string>} preRequisites
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} academicYear - The academic year in which the course is offered (e.g., "2023-2024").
 * @property {string} classCode
 * @property {number} credits
 * @property {number} capacity
 * @property {string} description
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Assignment
 * @property {string} _id
 * @property {string} name
 * @property {string} courseCode - The course code displayed with the assignment.
 * @property {Course} course - The course associated with the assignment.
 * @property {string} dueDate
 * @property {number} maxGrade
 * @property {number} weight - The weight of the assignment in the overall grade calculation.
 * @property {string} instructions
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} type - The type of the assignment (e.g., "homework", "project", etc.).
 */

export {};
