import mongoose from "mongoose";

const GradesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id for this grade"],
    },
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignments",
      required: [true, "Please provide an assignment id for this grade"],
    },
    grade: {
      type: Number,
      required: [true, "Please provide a grade for this grade"],
      min: [0, "Grade must be at least 0"],
      max: [100, "Grade must be at most 100"],
    },
  },
  { timestamps: true }
);

GradesSchema.index({ userId: 1 });
// GradesSchema.index({ userId: 1, classId: 1 });

export default mongoose.model("Grades", GradesSchema);
