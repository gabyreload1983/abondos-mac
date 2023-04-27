import mongoose from "mongoose";

const userCollection = "users";

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    require: true,
  },
  code_technical: {
    type: String,
    unique: true,
    required: true,
  },
  first_name: String,
  last_name: String,
  role: {
    type: String,
    default: "user",
  },
  adminView: {
    type: Boolean,
    default: false,
  },
});

export const userModel = mongoose.model(userCollection, usersSchema);
