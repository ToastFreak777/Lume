import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
      required: [true, "Please provide a role for this user"],
      trim: true,
    },
    first_name: {
      type: String,
      required: [true, "Please provide a first name for this user"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Please provide a last name for this user"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email for this user"],
      unique: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    passwordHash: {
      type: String,
      required: [true, "Please provide a password for this user"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      default: null,
    },
    studentIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: [],
    },
  },
  { timestamps: true }
);

UsersSchema.pre("save", function (next) {
  if (this.role === "STUDENT" && !this.parentId) {
    return next(new Error("Students must have a parentId"));
  }
  next();
});

export default mongoose.model("Users", UsersSchema);
