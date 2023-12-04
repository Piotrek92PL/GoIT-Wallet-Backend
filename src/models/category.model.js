import mongoose from "mongoose";

const { Schema } = mongoose;

const CategorySchema = new Schema({
  id: {
    type: Number,
    // required: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: String,
    unique: [true, "Name must be unique"],
    required: [true, "Name is required"],
    trim: true,
  },
  color: {
    type: String,
    default: "#00AD84",
  },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
