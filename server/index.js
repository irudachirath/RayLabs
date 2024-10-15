require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsConfig = require("./config/cors");
const firebaseAdmin = require("./config/firebase");

const db = firebaseAdmin.firestore();
// const bucket = firebaseAdmin.storage().bucket();

const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors(corsConfig));
app.use(express.json());

// routes
app.use("/api/v1/images", require("./routes/imageRoutes.js"));
app.use("/api/v1/users", require("./routes/userRoutes.js"));
app.use("/api/v1/reports", require("./routes/reportRoutes.js"));

// start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
