import bcrypt from "bcrypt";
import mongoose from "mongoose";

export type IUser = {
  email: string;
  password: string;
  username: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      select: false
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required."],
      lowercase: true
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        const { password: _password, __v: _v, ...rest } = ret;
        return rest;
      }
    }
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.pre("save", function () {
  if (this.isNew && !this.avatar) {
    this.avatar = `https://robohash.org/${this.username}`;
  }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
