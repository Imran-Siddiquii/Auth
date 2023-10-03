import { Schema, model } from 'mongoose';

const userSchema = Schema(
  {
    name: String,
    username: {
      type: String,
      required: true,
      minlength: 5,
      unique: true,
      //   match: /^[a-zA-Z0-9_-]+$/,
      trim: true,
      lowercase: true,
      index: true, // Optional, creates an index for faster lookups
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    age: String,
    pincode: Number,
  },
  { timestamps: true }
);

const User = model('User', userSchema);
export default User;
