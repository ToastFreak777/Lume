import mongoose from "mongoose";

const ClassesSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: [true, "Please provide a name for this class"],
      trim: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a instructor id for this class"],
    },

    subject: {
      type: String,
      required: [true, "Please provide a subject for this class"],
    },
    semester: {
      type: String,
      enum: ["Fall", "Spring", "Summer"],
      required: [true, "Please provide a semester for this class"],
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    preRequisites: {
      type: [String],
      default: [],
    },
    academicYear: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{4}$/, "Use format YYYY-YYYY"],
    },
    courseCode: {
      type: String,
      required: [true, "Please provide a course code for this class"],
      trim: true,
    },
    credits: {
      type: Number,
      required: [true, "Please provide a credit for this class"],
    },
    capacity: {
      type: Number,
      required: [true, "Please provide a capacity for this class"],
    },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Classes", ClassesSchema);
