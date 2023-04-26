import mongoose from "mongoose";

const customerCollections = "customers";

const customersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

export const customerModel = mongoose.model(
  customerCollections,
  customersSchema
);
