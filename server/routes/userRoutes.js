const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");

// Define the /register route
router.post("/register", registerUser);

module.exports = router;
