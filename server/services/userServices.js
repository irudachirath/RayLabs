const db = require("../config/firebase").database();

module.exports.createUser = async (data) => {
  const user = {
    name: data.name || "",
    gender: data.gender || "",
    email: data.email || "",
    hashedPassword: data.password || "",
    reportIds: data.reportIds || [],
  };

  const ref = db.ref("users");
  console.log(user);

  const userRef = await ref.push(user);

  return { id: userRef.key, gender: user.gender };
};
