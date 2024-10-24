import React, { useState, useEffect } from "react";
import "./ChatHistory.css"; // Ensures CSS is imported
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";

const ChatHistory = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getChats() {
    try {
      setLoading(true);
      const accessToken = await document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        .split("=")[1];
      const decodedToken = await jwtDecode(accessToken);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/chats/`,
        {
          params: {
            userId: decodedToken.user.id,
          },
        }
      );
      await setChats(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="chat-history">
      {loading ? (
        <div className="chat-item py-2">
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="secondary" />
          </Stack>
        </div>
      ) : (
        <div className="chats">
          {chats.map((chat) => (
            <Link to={`/chatbot/${chat.id}`} key={chat.id}>
              <div
                key={chat.id}
                className="chat-item py-2 flex justify-start text-white"
              >
                {chat.title}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
