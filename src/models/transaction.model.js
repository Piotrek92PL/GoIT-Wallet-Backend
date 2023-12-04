import mongoose from "mongoose";
// import * as services from "#services/categories/index.js";

// const isCategoryNum = async (num) => {
//   const categories = await services.getCategories();
//   const isCatNum =
//     (await categories.find((cat) => {
//       return cat.id === num;
//     })) !== undefined;
//   return isCatNum;
// };

const { Schema } = mongoose;

const TransactionSchema = new Schema({
  type: {
    type: String,
    required: [true, "Type is required"],
    enum: ["income", "expense"],
  },
  category: {
    type: Number,
    required: [true, "Category is required"],
    trim: true,validate: 
    {
      validator: function (value) {
        return value > 0;
      },
      message: "Type must be a positive number",
    },
    // validate: {
    //   validator: await isCategoryNum,
    //   message: "Type must match existing category number",
    // },
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
