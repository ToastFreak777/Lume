import mongoose from "mongoose";

const NotificationsSchema = new mongoose.Schema(
  {
    userIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      required: [true, "Please provide user id(s) for this notification"],
      default: [],
    },
    body: {
      type: String,
      required: [true, "Please provide a body for this notification"],
    },
    subject: {
      type: String,
      required: [true, "Please provide a subject for this notification"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notifications", NotificationsSchema);
