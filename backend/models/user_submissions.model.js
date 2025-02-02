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
    status: {
      type: String,
      enum: ["SUBMITTED", "GRADED", "LATE"],
      required: [true, "Please provide a status for this submission"],
    },
  },
  { timestamps: true }
);

// UserSubmissionSchema.index({ userId: 1, assignmentId: 1 });

export default mongoose.model("UserSubmissions", UserSubmissionSchema);
