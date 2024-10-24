const firebase = require("../config/firebase");
const db = firebase.firestore();
const bucket = firebase.storage().bucket();
const axios = require("axios");

const addNewMessageAndResponse = async (chatId, object) => {
  const chatRef = db.collection("chats").doc(chatId);
  const chat = await chatRef.get();
  if (!chat.exists) {
    throw new Error("Chat not found");
  }
  // add object to the messages array
  const messages = chat.data().messages;
  messages.push(object);
  await chatRef.update({
    messages: messages,
  });
};

module.exports.createChat = async (data) => {
  const userId = data.userId;
  const chat = {
    dateCreated: new Date(),
    LastAccessed: new Date(),
    messages: [],
  };
  const chatRef = db.collection("chats");
  const docRef = await chatRef.add(chat);
  const chatId = docRef.id;
  // add the chat ID to the user's chatIds array
  const userRef = db.collection("users").doc(userId);
  const user = await userRef.get();
  const chatIds = user.data().chatIds || [];
  chatIds.push(chatId);
  await userRef.update({
    chatIds: chatIds,
  });
  return { id: chatId };
};

module.exports.getChats = async (userId) => {
  const userRef = db.collection("users").doc(userId);
  const user = await userRef.get();
  if (!user.exists) {
    throw new Error("User not found");
  }
  const chatIds = user.data().chatIds || [];
  const chats = [];
  for (const chatId of chatIds) {
    const chat = await db.collection("chats").doc(chatId).get();
    if (chat.data().messages.length > 0) {
      const title = chat.data().messages[0].user;
      chats.push({ id: chat.id, title: title });
    }
  }
  return chats;
};

module.exports.getChatById = async (chatId) => {
  const chatRef = db.collection("chats").doc(chatId);
  // check if the chat exists
  const chat = await chatRef.get();
  if (!chat.exists) {
    throw new Error("Chat not found");
  }
  return chat.data();
};

module.exports.deleteChat = async (chatId) => {
  const chatRef = db.collection("chats").doc(chatId);
  if (!(await chatRef.get()).exists) {
    throw new Error("Chat not found");
  }
  // delete the chat
  await chatRef.delete();
  // delete the chat ID from the user's chatIds array
  const userRef = db
    .collection("users")
    .where("chatIds", "array-contains", chatId);
  const user = await userRef.get();

  if (!user.exists) {
    throw new Error("User not found");
  }
  const chatIds = user.data().chatIds;
  const index = chatIds.indexOf(chatId);
  chatIds.splice(index, 1);
  await userRef.update({
    chatIds: chatIds,
  });
  return;
};

module.exports.sendMessage = async (chatId, data) => {
  const chat = await axios.get(
    `${process.env.BACKEND_URL}/api/v1/chats/${chatId}`
  );
  const chatData = chat.data;
  chatData.messages.push({ user: data, assistant: "" });
  // if length of chat history is greater than 10, remove the first message
  if (chatData.messages.length > 10) {
    chatData.messages.shift();
  }
  // send chat history to the chatbot
  const chatbotResponse = await axios.post(
    `${process.env.FASTAPI_BACKEND_URL}/api/v1/chatbot/chat`,
    chatData.messages
  );
  // add the user's message and the chatbot's response to the chat
  await addNewMessageAndResponse(chatId, {
    user: data,
    assistant: chatbotResponse.data.text,
  });
  return chatbotResponse.data.text;
};
