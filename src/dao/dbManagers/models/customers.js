import mongoose from "mongoose";

const customerCollections = "customers";

const customersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  terminals: [{ type: mongoose.Schema.Types.ObjectId, ref: "terminals" }],
});

export const customerModel = mongoose.model(
  customerCollections,
  customersSchema
);
