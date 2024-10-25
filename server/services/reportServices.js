const { default: axios } = require("axios");
const firebase = require("../config/firebase");
const db = firebase.firestore();
const bucket = firebase.storage().bucket();

const getAllFoundConditions = (data) => {
  const allFoundConditions = [];
  data.forEach((condition) => {
    condition.prediction.forEach((pred) => {
      if (pred.sigmoid_value > 0.5) {
        allFoundConditions.push({
          disease: pred.disease,
          sigmoid_value: pred.sigmoid_value,
        });
      }
    });
  });
  if (allFoundConditions.length === 0) {
    allFoundConditions.push({
      disease: "No conditions found",
      sigmoid_value: 0,
    });
  }
  return allFoundConditions;
};

const getAverageSigmoidValue = (results) => {
  const avgPred = {};
  results.data.map((result) => {
    result.prediction.map((pred) => {
      if (avgPred[pred.disease] === undefined) {
        avgPred[pred.disease] = pred.sigmoid_value;
      } else {
        avgPred[pred.disease] += pred.sigmoid_value;
      }
    });
  });
  Object.keys(avgPred).map((key) => {
    avgPred[key] /= results.data.length;
  });
  return avgPred;
};

const getTopConditions = (avgPred) => {
  const topConditions = [];
  Object.keys(avgPred).forEach((key) => {
    if (avgPred[key] > 0.5) {
      topConditions.push({ disease: key, sigmoid_value: avgPred[key] });
    }
  });
  if (topConditions.length === 0) {
    topConditions.push({ disease: "No conditions found", sigmoid_value: 0 });
  }
  return topConditions;
};

module.exports.createReport = async (data) => {
  const allFoundConditions = getAllFoundConditions(data.data.data);
  const avgPred = getAverageSigmoidValue(data.data);
  const topConditions = getTopConditions(avgPred);
  const report = {
    data: data.data.data || [],
    allFoundConditions: allFoundConditions || [],
    topConditions: topConditions || [],
    status: data.data.status || "pending",
    description: data.description || "",
    location: data.location || "",
    timeStamp: data.timeStamp || "",
    accessedTimeStamp: data.timeStamp || "",
  };

  const reportRef = db.collection("reports");
  const docRef = await reportRef.add(report);

  // add the report ID to the user's reportIds array
  const userRef = db.collection("users").doc(data.userId);
  await userRef.update({
    reportIds: firebase.firestore.FieldValue.arrayUnion(docRef.id),
  });

  return { id: docRef.id };
};

module.exports.getAllReports = async () => {
  const reportRef = db.collection("reports");
  const snapshot = await reportRef.get();
  const reports = [];
  snapshot.forEach((doc) => {
    reports.push({ id: doc.id, ...doc.data() });
  });
  return reports;
};

module.exports.getReportIdsByUserId = async (userId) => {
  const userRef = db.collection("users").doc(userId);
  const user = await userRef.get();
  if (!user.exists) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return user.data().reportIds;
};

module.exports.getReportById = async (reportId) => {
  const reportRef = db.collection("reports").doc(reportId);
  const report = await reportRef.get();
  // throw an error if the report does not exist and send a 404 status code
  if (!report.exists) {
    const error = new Error("Report not found");
    error.status = 404;
    throw error;
  }
  return { id: report.id, ...report.data() };
};

module.exports.deleteReport = async (reportId) => {
  const reportRef = db.collection("reports").doc(reportId);
  if (!(await reportRef.get()).exists) {
    const error = new Error("Report not found");
    error.status = 404;
    throw error;
  }
  let userId;

  // delete the report ID from the user's reportIds array
  const userRef = db
    .collection("users")
    .where("reportIds", "array-contains", reportId);
  const userSnapshot = await userRef.get();
  userSnapshot.forEach(async (doc) => {
    userId = doc.id;
    await doc.ref.update({
      reportIds: firebase.firestore.FieldValue.arrayRemove(reportId),
    });
  });
  // get the userId from the report
  const doc = await db.collection("users").doc(userId).get();
  const name = doc.data().firstName; // Replace 'name' with the actual field name

  // get image links from the report
  const report = await reportRef.get();
  const images = report.data().data;

  // delete images from storage
  images.forEach(async (image) => {
    let fileName = image.image_url.split("/").pop();
    fileName = fileName.split("?")[0];
    // remove images% from the fileName
    fileName = fileName.replace("images%", "");
    await bucket.file(`images/${name}_${userId}/${fileName}`).delete();
  });

  // delete the report from the reports
  await reportRef.delete();
};

module.exports.createTextReport = async (reportId) => {
  const reportRef = db.collection("reports").doc(reportId);
  const report = await reportRef.get();
  if (!report.exists) {
    const error = new Error("Report not found");
    error.status = 404;
    throw error;
  }
  // get top conditions from the report
  const topConditionsObj = report.data().topConditions;
  // get 5 highest sigmoid value from the top conditions
  // check if the value of disease is 'No conditions found'then return no conditions found
  if (topConditionsObj[0].disease === "No conditions found") {
    return { message: "No conditions found" };
  }
  let topConditions = topConditionsObj
    .sort((a, b) => b.sigmoid_value - a.sigmoid_value)
    .slice(0, 5);
  topConditions = topConditions.map((condition) => condition.disease);
  console.log(topConditions);
  const body = {
    conditions: topConditions,
  };
  const textReport = await axios.post(
    `${process.env.FASTAPI_BACKEND_URL}/api/v1/chatbot/report/`,
    body
  );
  // add new fields to the report called 'textReport'
  await reportRef.update({
    textReport: textReport.data,
  });
  return { message: "Text report created successfully" };
};
