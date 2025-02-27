import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id for this attendance record"],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
      required: [true, "Please provide a course id for this attendance record"],
    },
    date: {
      type: Date,
      required: [true, "Please provide a date for this attendance record"],
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late", "Excused"],
      required: [true, "Please provide a status for this attendance record"],
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

// AttendanceSchema.index({ userId: 1 });

export default mongoose.model("Attendance", AttendanceSchema);
