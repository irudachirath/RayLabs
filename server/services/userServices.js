const db = require("../config/firebase").firestore();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const qs = require("qs");

const createToken = async (userId) => {
  try {
    const payload = {
      user: {
        id: userId,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    return token;
  } catch (err) {
    throw new Error("Failed to create token.", err);
  }
};

const getUserIdByEmail = async (email) => {
  const userRef = db.collection("users");
  const snapshot = await userRef.where("email", "==", email).get();
  if (snapshot.empty) {
    return null;
  }
  let userId;
  snapshot.forEach((doc) => {
    userId = doc.id;
  });
  return userId;
};

const checkUserExists = async (email) => {
  const userRef = db.collection("users");
  const snapshot = await userRef.where("email", "==", email).get();
  if (snapshot.empty) {
    return false;
  }
  return true;
};

const getGoogleRedirectUrl = async () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    access_type: "online",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const queryString = new URLSearchParams(options).toString();
  const url = `${rootUrl}?${queryString}`;
  return url;
};

const getGoogleOAuthToken = async (code) => {
  try {
    const rootUrl = "https://oauth2.googleapis.com/token";
    const options = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
      code: code,
    };

    // Use 'qs' to serialize the options into the required URL-encoded format
    const data = await axios.post(
      rootUrl,
      qs.stringify(options), // Send the options as form data
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data.data; // Return the actual data from the response
  } catch (error) {
    console.error(
      "Failed to get Google OAuth token.",
      error.response?.data || error.message
    );
    throw new Error("Failed to get Google OAuth token.");
  }
};

const getUserFromGoogle = async (id_token, access_token) => {
  try {
    const rootUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
    const options = {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    };

    const user = await axios.get(
      `${rootUrl}?alt=json&access_token=${access_token}`,
      options
    );
    return user;
  } catch (error) {
    throw new Error("Failed to get user from Google.", error);
  }
};

const createUser = async (data) => {
  const { name, gender, email, password } = data;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    name,
    gender,
    email,
    hashedPassword,
    reportIds: [],
  };

  try {
    const userRef = db.collection("users");
    const docRef = await userRef.add(user); // 'add' returns a document reference with the generated ID
    const token = await createToken({ id: docRef.id });
    return { token: token };
  } catch (err) {
    throw new Error("Failed to create user.", err);
  }
};

const saveGoogleUser = async (data) => {
  const { email, fullName, firstName, lastName, picture, hd } = data;
  const user = {
    email,
    fullName,
    firstName,
    lastName: lastName || null,
    picture: picture || null,
    hd: hd || null,
    service: "google",
    reportIds: [],
  };

  try {
    const userRef = db.collection("users");
    const docRef = await userRef.add(user);
    const token = await createToken(docRef.id);
    return { token: token };
  } catch (err) {
    throw err;
  }
};

exports.createToken = createToken;
exports.getUserIdByEmail = getUserIdByEmail;
exports.checkUserExists = checkUserExists;
exports.getGoogleRedirectUrl = getGoogleRedirectUrl;
exports.getGoogleOAuthToken = getGoogleOAuthToken;
exports.getUserFromGoogle = getUserFromGoogle;
exports.createUser = createUser;
exports.saveGoogleUser = saveGoogleUser;
