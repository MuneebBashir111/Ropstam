const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for Car
const CarSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, "The category field is required"],
    },
    reg_no: String,
    make: String,
    model: String,
    color: String,
  },
  { collection: "Cars" }
);

// Create model for Car

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
