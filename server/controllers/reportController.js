const reportServices = require("../services/reportServices");

const getReports = async (req, res) => {
  try {
    const reports = await reportServices.getAllReports();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReportByUserId = async (req, res) => {
  try {
    const reportIds = await reportServices.getReportIdsByUserId(req.params.id);

    // Use Promise.all to wait for all the report fetching promises to resolve
    const reports = await Promise.all(
      reportIds.map(async (reportId) => {
        const report = await reportServices.getReportById(reportId);
        return { id: reportId, ...report }; // Return each report with its ID
      })
    );
    res.status(200).json(reports); // Send the completed array of reports
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReportByReportId = async (req, res) => {
  try {
    const report = await reportServices.getReportById(req.params.id);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReport = async (req, res) => {
  try {
    const report = await reportServices.createReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    await reportServices.deleteReport(req.params.id);
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTextReport = async (req, res) => {
  try {
    const report = await reportServices.createTextReport(req.params.id);
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReports,
  createReport,
  deleteReport,
  getReportByUserId,
  getReportByReportId,
  createTextReport,
};
