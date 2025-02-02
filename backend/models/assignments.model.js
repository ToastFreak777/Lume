import mongoose from "mongoose";

const AssignmentsSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classes",
      required: [true, "Please provide a class id for this assignment"],
    },
    assignmentName: {
      type: String,
      required: [true, "Please provide a name for this assignment"],
    },
    dueDate: {
      type: Date,
      required: [true, "Please provide a due date for this assignment"],
      validate: (value) => value > Date.now(),
      message: "Due date must be in the future",
    },
    description: { type: String, trim: true },
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
    comments: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Assignments", AssignmentsSchema);
