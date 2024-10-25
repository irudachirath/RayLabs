const chatServices = require("../services/chatServices");

const createChat = async (req, res) => {
  try {
    const chat = await chatServices.createChat(req.body);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChats = async (req, res) => {
  try {
    const chats = await chatServices.getChats(req.query.userId);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChat = async (req, res) => {
  try {
    const chat = await chatServices.getChatById(req.params.id);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    await chatServices.deleteChat(req.params.id);
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const chatbotResponse = await chatServices.sendMessage(
      req.params.id,
      req.body.message
    );
    res.status(201).json(chatbotResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createChat, getChats, getChat, deleteChat, sendMessage };
