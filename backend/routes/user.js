const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// http://localhost/api/user/login - POST
router.post("/login", userController.loginUser);

// http://localhost/api/user/signup - POST
router.post("/signup", userController.signupUser);

module.exports = router;
