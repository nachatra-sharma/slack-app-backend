import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist."],
      match: [
        // eslint-disable-next-line
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address"
      ]
    },
    password: {
      type: String,
      required: [true, "Password is required."]
    },
    username: {
      type: String,
      unique: [true, "Username already exists."],
      required: [true, "Username is required."],
      match: [
        /^[a-zA-Z0-9]+$/,
        "Username must contains only letters and numbers."
      ]
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function saveUserAvatar() {
  this.avatar = `https://robohash.org/${this.username}`;
});

const User = mongoose.model("User", userSchema);

export default User;
