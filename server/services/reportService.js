const admin = require("../config/firebase");
const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports.createReport = async (data) => {
  const report = {
    data: data.data.data || [],
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
    reportIds: admin.firestore.FieldValue.arrayUnion(docRef.id),
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
  return user.data().reportIds;
};

module.exports.getReportById = async (reportId) => {
  const reportRef = db.collection("reports").doc(reportId);
  const report = await reportRef.get();
  return { id: report.id, ...report.data() };
};

module.exports.deleteReport = async (reportId) => {
  const reportRef = db.collection("reports").doc(reportId);
  let userId;

  // delete the report ID from the user's reportIds array
  const userRef = db
    .collection("users")
    .where("reportIds", "array-contains", reportId);
  const userSnapshot = await userRef.get();
  userSnapshot.forEach(async (doc) => {
    userId = doc.id;
    await doc.ref.update({
      reportIds: admin.firestore.FieldValue.arrayRemove(reportId),
    });
  });
  // get the userId from the report
  const doc = await db.collection("users").doc(userId).get();
  const name = doc.data().name; // Replace 'name' with the actual field name

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
