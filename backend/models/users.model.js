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
    password: {
      type: String,
      required: [true, "Please provide a password for this user"],
      minlength: [6, "Password must be at least 6 characters"],
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
    enrollmentYear: {
      type: Number,
      min: 2000,
      max: 2100,
    },
    graduationYear: {
      type: Number,
      min: 2000,
      max: 2100,
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
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

UsersSchema.methods.verifyToken = async function (candidatePassword) {
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
