import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;