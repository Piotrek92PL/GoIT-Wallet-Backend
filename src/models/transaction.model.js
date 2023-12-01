import mongoose from "mongoose";

const { Schema } = mongoose;

const TransactionSchema = new Schema({
  type: {
    type: String,
    required: [true, "Type is required"],
    enum: ["income", "expense"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: "Amount must be a positive number",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: String,
    default: null,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
