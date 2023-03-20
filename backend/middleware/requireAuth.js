const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  // Check if req was sent with token
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // get only token from string --> 'Bearer {token}'
  const token = authorization.split(" ")[1];

  try {
    // verify token with secret
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (e) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
