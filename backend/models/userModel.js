const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String, required: true },
});

// Static signup method
userSchema.statics.signup = async function signup({ email, name, password }) {
  // Validate fields
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // Check if email already in use
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use.");
  }

  // Hash password with bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user in mongodb
  const user = await this.create({ email, name, password: hashedPassword });

  return user;
};

// static login method
userSchema.statics.login = async function login(email, password) {
  // validate fields
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  // Check if user email exists
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  // check if password matches db password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("WorkoutUser", userSchema);
