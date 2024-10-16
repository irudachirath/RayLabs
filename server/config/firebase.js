const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = firebaseAdmin.storage().bucket();

async function setCacheControl(path) {
  const file = bucket.file(path);
  await file.setMetadata({
    cacheControl: 'public, max-age=31536000'
  });
  console.log(`Cache-Control set for ${path}`);
}

// Paths to images in firebase
const paths = [
  'landing_page/logo_rayLabs.webp',
  'landing_page/hero_image.webp',
  'landing_page/bg_image.png',
  'about_us_page/about_us_hero_image.webp',

];

paths.forEach(path => setCacheControl(path));

module.exports = firebaseAdmin;
