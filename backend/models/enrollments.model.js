import mongoose from "mongoose";

const UserEnrollmentsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id for this enrollment"],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
      required: [true, "Please provide a course id for this enrollment"],
    },
  },
  { timestamps: true }
);

// UserEnrollmentsSchema.index({ userId: 1, classId: 1 }, { unique: true });

export default mongoose.model("UserEnrollments", UserEnrollmentsSchema);
