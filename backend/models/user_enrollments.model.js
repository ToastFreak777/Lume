import mongoose from "mongoose";

const UserEnrollmentsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id for this enrollment"],
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classes",
      required: [true, "Please provide a class id for this enrollment"],
    },
  },
  { timestamps: true }
);

// UserEnrollmentsSchema.index({ userId: 1, classId: 1 }, { unique: true });

export default mongoose.model("UserEnrollments", UserEnrollmentsSchema);
