import mongoose from "mongoose";

const AssignmentsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name for this assignment"],
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Courses",
            required: [true, "Please provide a course id for this assignment"],
        },
        dueDate: {
            type: Date,
            required: [true, "Please provide a due date for this assignment"],
            // validate: (value) => value > Date.now(),
            message: "Due date must be in the future",
        },
        maxGrade: {
            type: Number,
            required: [true, "Please provide a max grade for this assignment"],
            min: [1, "Max grade must be at least 1"],
            max: [100, "Max grade must be at most 100"],
        },
        weight: {
            type: Number,
            default: 1,
        },
        type: {
            type: String,
            enum: ['homework', 'quiz', 'exam'],
        },
        instructions: {type: String, trim: true},
    },
    {timestamps: true}
);

export default mongoose.model("Assignments", AssignmentsSchema);
