import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please provide a name for this subject"],
  },
  abbreviation: {
    type: String,
    required: [true, "Please provide a code for this subject"],
  },
});

export default mongoose.model("Subjects", SubjectSchema);
