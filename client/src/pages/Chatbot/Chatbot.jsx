import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import { FaTrashAlt } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { RiCrosshair2Line } from "react-icons/ri";
import { MdOutlineTrendingUp } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { logo } from "../../utils";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { jwtDecode } from "jwt-decode";
import MarkdownText from "../../components/MarkdownText/MarkdownText";
import DotsLoader from "../../components/DotsLoader/DotsLoader";
import ChatHistory from "./ChatHistory";

const Chatbot = () => {
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { chatId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Function to get and decode cookie
  const getCookie = (name) => {
    const cookieArr = document.cookie.split("; ");
    const cookie = cookieArr.find((row) => row.startsWith(`${name}=`));
    if (cookie) {
      const value = cookie.split("=")[1];
      return decodeURIComponent(value); // Decode the URL-encoded string
    }
    return null;
  };

  useEffect(() => {
    if (chatId) {
      setIsChatStarted(true);
      loadChat(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const startNewChat = async () => {
    try {
      const accessToken = await document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        .split("=")[1];
      const decodedToken = await jwtDecode(accessToken);
      const response = await axios.post(
        `
        ${import.meta.env.VITE_API_BASE_URL}/api/v1/chats`,
        { userId: decodedToken.user.id }
      );
      const newChatId = response.data.id;
      navigate(`/chatbot/${newChatId}`);
    } catch (error) {
      console.error("Failed to start new chat:", error);
    }
  };

  const loadChat = async (chatId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/chats/${chatId}`
      );
      const chatData = [];
      response.data.messages.map(
        (message) => (
          chatData.push({ text: message.user, sender: "user" }),
          chatData.push({ text: message.assistant, sender: "bot" })
        )
      );
      setMessages(chatData || []); // Fallback to an empty array
    } catch (error) {
      console.error("Failed to load chat:", error);
      setMessages([]); // Set empty array in case of error
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (input.trim()) {
      setIsLoading(true);
      if (input === "") {
        toast.error("Input cannot be empty.");
        return;
      }
      const inputHolder = input;
      setInput(""); // Clear input after sending
      setMessages([...messages, { text: input, sender: "user" }]);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/chats/${chatId}`,
        {
          message: inputHolder,
        }
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: response.data,
          sender: "bot",
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="main-grid">
      <div className="container-sidebar">
        <div className="account-info">
          <img
            className="w-10 h-10 bg-red-500 rounded-full"
            src={getCookie("picture")}
            alt="User"
          />
          <div className="pl-2 flex flex-col justify-start items-start">
            <div className="account-name">
              {getCookie("username") &&
                getCookie("username")[0].toUpperCase() +
                  getCookie("username").slice(1)}
            </div>
            <div className="account-type">Free account</div>
          </div>
        </div>
        <div className="w-full">
          <Link to="/chatbot" target="_blank">
            <button className="new-chat-btn">+ Start a new chat</button>
          </Link>
          <div>
            <ChatHistory ContainerHeight={450} />
          </div>
          <div className="settings mt-3">
            <div className="settings-item tracking-wider">
              <FaTrashAlt className="icon" />
              Clear all conversations
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Link to="/">
          <div className="">
            <img className="logo" src={logo} alt="RayLabs Logo" />
          </div>
        </Link>
        {!isChatStarted ? (
          <div className="w-full overflow-auto scroll-container mb-[70px]">
            <div className="header">
              <div className="flex justify-center mb-2">
                <div>
                  <h1 className="title">Chat With </h1>
                </div>
                <div className="bg-pink-gradient-secondary ml-2 px-2">
                  <h1 className="title">RayLabs</h1>
                </div>
              </div>
              <p className="tagline">
                The power of AI at your service - Tame the knowledge!
              </p>
            </div>
            <div className="features">
              <div className="feature-box flex flex-col items-center justify-center">
                <BsStars size="25" />
                <h3>Clear and precise</h3>
                <p>Pariatur sint laborum cillum aute consectetur irure.</p>
              </div>
              <div className="feature-box flex flex-col items-center justify-center">
                <RiCrosshair2Line size="25" />
                <h3>Personalized answers</h3>
                <p>Pariatur sint laborum cillum aute consectetur irure.</p>
              </div>
              <div className="feature-box flex flex-col items-center justify-center">
                <MdOutlineTrendingUp size="25" />
                <h3>Increased efficiency</h3>
                <p>Pariatur sint laborum cillum aute consectetur irure.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full mt-14 overflow-auto scroll-container">
            <div className="messages">
              {messages &&
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${
                      message.sender === "user" ? "user-message" : "bot-message"
                    }`}
                  >
                    {message.sender === "bot" ? (
                      <div className="markdown">
                        <MarkdownText text={message.text} />
                      </div>
                    ) : (
                      <p>{message.text}</p>
                    )}
                  </div>
                ))}

              {isLoading && (
                <div className="message bot-message">
                  <DotsLoader />
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>
        )}
        <div className="fixed bottom-[10px] py-4 flex justify-center items-center">
          {isChatStarted ? (
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="chat-textbox"
                placeholder="Type your message here..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="button-submit rounded-full px-[10px]"
              >
                <IoMdSend size="20" />
              </button>
            </div>
          ) : (
            <PrimaryButton
              text="Start Chat"
              onClick={async () => {
                await startNewChat();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
