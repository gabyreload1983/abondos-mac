import mongoose from "mongoose";

const terminalsCollections = "terminals";

const terminalsSchema = new mongoose.Schema({
  mac: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
  },
  code_terminal: {
    type: String,
  },
  description: {
    type: String,
  },
});

terminalsSchema.pre("find", function () {
  this.populate("customer");
});

export const terminalModel = mongoose.model(
  terminalsCollections,
  terminalsSchema
);
