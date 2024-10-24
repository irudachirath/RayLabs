const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  googleRedirectUrl,
  googleOAuthLogin,
} = require("../controllers/userController");

// Define the /register route
router.get("/login/google/redirect", googleRedirectUrl);
router.get("/login/google/oauth", googleOAuthLogin);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
