const userServices = require("../services/userServices");

const registerUser = async (req, res) => {
  try {
    const emailExists = await userServices.checkUserExists(req.body.email);
    if (emailExists) {
      return res.status(409).json({ error: "Email already exists" });
    }
    const { token } = await userServices.createUser(req.body);
    res
      .status(201)
      .json({ message: "Registation Success", accessToken: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    res.status(200).json("user logged in");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
