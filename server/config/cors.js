const corsConfig = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://localhost:3000",
    "https://localhost:5000",
    "https://ray-labs.vercel.app/",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

module.exports = corsConfig;
