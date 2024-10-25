const express = require("express");
const router = express.Router();
const {
  getReports,
  createReport,
  deleteReport,
  getReportByUserId,
  getReportByReportId,
  createTextReport,
} = require("../controllers/reportController");

// Define the /reports route
router.get("/", getReports);
router.get("/user/:id", getReportByUserId);
router.get("/report/:id", getReportByReportId);
router.post("/", createReport);
router.delete("/:id", deleteReport);
router.post("/text-report/:id", createTextReport);

module.exports = router;
