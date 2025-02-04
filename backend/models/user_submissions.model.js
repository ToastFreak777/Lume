import mongoose from "mongoose";

const UserSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id for this submission"],
    },
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignments",
      required: [true, "Please provide an assignment id for this submission"],
    },
    files: [
      {
        url: { type: String, required: true },
        filename: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Submitted", "Graded"],
      default: "Pending",
    },
    submissionDate: {
      type: Date,
      default: null,
    },
    feedback: { type: String, trim: true },
  },
  { timestamps: true }
);

// UserSubmissionSchema.index({ userId: 1, assignmentId: 1 }, {unique: true});

export default mongoose.model("UserSubmissions", UserSubmissionSchema);
