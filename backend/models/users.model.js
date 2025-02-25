import mongoose from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UsersSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["Admin", "Instructor", "Student", "Parent"],
      required: [true, "Please provide a role for this user"],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "Please provide a first name for this user"],
      trim: true,
    },
    lastName: {
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
    dob: {
      type: String,
      required: [true, "Please provide a date of birth for this user"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "unknown"],
      default: "unknown",
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, "Please provide a valid phone number"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password for this user"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    parentIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: [],
    },
    studentIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: [],
    },
    major: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true }
);

UsersSchema.pre("save", async function (next) {
  // prevent double hashing
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UsersSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, isAdmin: this.role === "Admin" },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  );
};

UsersSchema.methods.verifyPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UsersSchema.methods.addParent = async function (parentId) {
  if (!this.parentIds.includes(parentId)) {
    this.parentIds.push(parentId);
    await this.save();
  }
};

UsersSchema.methods.removeParent = async function (parentId) {
  this.parentIds = this.parentIds.filter((id) => !id.equals(parentId));
  await this.save();
};

UsersSchema.methods.addStudent = async function (studentId) {
  if (!this.studentIds.includes(studentId)) {
    this.studentIds.push(studentId);
    await this.save();
  }
};

UsersSchema.methods.removeStudent = async function (studentId) {
  this.studentIds = this.studentIds.filter((id) => !id.equals(studentId));
  await this.save();
};

UsersSchema.methods.calculateGPA = async function () {
  const grades = await mongoose.model("Grades").find({ userId: this._id });
  return grades.reduce((sum, g) => sum + g.grade, 0) / grades.length;
};

export default mongoose.model("Users", UsersSchema);
