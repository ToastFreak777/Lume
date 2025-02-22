import mongoose from "mongoose";

const CoursesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a name for this class"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a instructor id for this class"],
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subjects",
      required: [true, "Please provide a subject for this class"],
    },
    level: {
      type: Number,
      min: 100,
      max: 500,
      required: [true, "Please provide a level for this class"],
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
    format: {
      type: String,
      enum: ["In-Person", "Online", "Hybrid"],
      required: [
        true,
        "Please specify the format for this course (In-Person, Online, or Hybrid).",
      ],
    },
    preRequisites: {
      type: [String],
      default: [],
    },
    startDate: {
      type: Date,
      required: [true, "Please provide a start date for this class"],
    },
    endDate: {
      type: Date,
      required: [true, "Please provide a end date for this class"],
    },
    academicYear: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{4}$/, "Use format YYYY-YYYY"],
    },
    classCode: {
      type: String,
      trim: true,
      required: [true, "Please provide a course code for this class"],
    },
    credits: {
      type: Number,
      min: 1,
      required: [true, "Please provide a credit for this class"],
    },
    capacity: {
      type: Number,
      min: 1,
      required: [true, "Please provide a capacity for this class"],
    },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Courses", CoursesSchema);
