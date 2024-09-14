const admin = require("../config/firebase");
const bucket = admin.storage().bucket();
const axios = require("axios");

module.exports.uploadImage = async (filePath, fileName) => {
  const remotePath = `images/${fileName}`;

  await bucket.upload(filePath, { destination: remotePath });

  const [signedUrl] = await bucket.file(remotePath).getSignedUrl({
    action: "read",
    expires: "03-09-2491",
  });
  return signedUrl;
};
