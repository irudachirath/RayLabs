const userServices = require("../services/userServices");

const googleRedirectUrl = async (req, res) => {
  try {
    const redirectUrl = await userServices.getGoogleRedirectUrl();
    res.send(redirectUrl).status(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const googleOAuthLogin = async (req, res) => {
  try {
    // Get the code from the query string
    const { code } = req.query;
    // Get the token from Google
    const response = await userServices.getGoogleOAuthToken(code);
    const { id_token, access_token } = response;
    // Get the user from Google
    const user = await userServices.getUserFromGoogle(id_token, access_token);
    // Check if the user exists
    const emailExists = await userServices.checkUserExists(user.data.email);
    // Save the user if they don't exist
    let token;
    if (!emailExists) {
      // Save the user and create a token
      token = await userServices.saveGoogleUser({
        email: user.data.email,
        fullName: user.data.name,
        firstName: user.data.given_name,
        lastName: user.data.family_name,
        picture: user.data.picture,
        hd: user.data.hd,
      });
    } else {
      // Get the user's ID and create a token
      const userId = await userServices.getUserIdByEmail(user.data.email);
      token = await userServices.createToken(userId);
    }
    // Redirect to the frontend and set the cookies
    res.cookie("username", user.data.given_name);
    res.cookie("picture", user.data.picture);
    res.cookie("accessToken", token);
    res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

module.exports = {
  registerUser,
  loginUser,
  googleRedirectUrl,
  googleOAuthLogin,
};
