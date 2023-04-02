const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for User
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "The email field is required"],
    },
    first_name: String,
    last_name: String,
    password: String,
    token: String,
  },
  { collection: "Users" }
);

// Create model for User

const User = mongoose.model("User", UserSchema);

module.exports = User;
