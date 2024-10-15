const express = require("express");
const router = express.Router();
const { uploadImages } = require("../controllers/imageController");

// Define the /register route
router.post("/upload", uploadImages);

module.exports = router;
