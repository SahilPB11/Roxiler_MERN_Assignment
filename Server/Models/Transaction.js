import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true },
    dateOfSale: { type: Date, required: true },
    sold: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
