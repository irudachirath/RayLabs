const db = require("../config/firebase").firestore();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.checkUserExists = async (email) => {
  const userRef = db.collection("users");
  const snapshot = await userRef.where("email", "==", email).get();
  if (snapshot.empty) {
    return false;
  }
  return true;
};

module.exports.createUser = async (data) => {
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

    const payload = {
      user: {
        id: docRef.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    return { token: token };
  } catch (err) {
    throw new Error("Failed to create user.", err);
  }
};
