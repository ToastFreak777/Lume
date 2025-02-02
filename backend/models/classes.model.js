import mongoose from "mongoose";

const ClassesSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: [true, "Please provide a name for this class"],
      trim: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a teacher id for this class"],
    },
    subject: {
      type: String,
      required: [true, "Please provide a subject for this class"],
    },
    academicYear: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Classes", ClassesSchema);
