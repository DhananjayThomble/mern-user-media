import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
