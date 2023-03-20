const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, name: user.name, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }

  res.json({ message: "Login user" });
};

// Sigup user
const signupUser = async (req, res) => {
  const newUser = req.body;
  try {
    const registeredUser = await User.signup(newUser);

    // create a token
    const token = createToken(registeredUser._id);

    res.status(200).json({ email: newUser.email, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { loginUser, signupUser };