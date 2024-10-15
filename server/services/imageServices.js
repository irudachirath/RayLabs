const admin = require("../config/firebase");
const bucket = admin.storage().bucket();
const db = admin.firestore();

module.exports.uploadImage = async (filePath, fileName, userId) => {
  const userRef = db.collection("users").doc(userId);
  const user = await userRef.get();
  if (!user.exists) {
    throw new Error("User not found");
  }
  const remotePath = `images/${user.data().name}_${userId}/${fileName}`;

  await bucket.upload(filePath, { destination: remotePath });

  const [signedUrl] = await bucket.file(remotePath).getSignedUrl({
    action: "read",
    expires: "03-09-2491",
  });
  return signedUrl;
};
