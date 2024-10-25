const router = require("express").Router();
const {
  createChat,
  getChats,
  getChat,
  deleteChat,
  sendMessage,
} = require("../controllers/chatController");

router.post("/", createChat);
router.get("/", getChats);
router.get("/:id", getChat);
router.delete("/:id", deleteChat);
router.post("/:id", sendMessage);

module.exports = router;
