import "./Chatbot.css";
import {
  FaUserCircle,
  FaTrashAlt,
  FaSun,
  FaGem,
  FaQuestionCircle,
  FaPowerOff,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { RiCrosshair2Line } from "react-icons/ri";
import { MdOutlineTrendingUp } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
// import arrow from "../../assets/arrow.svg";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput(""); // Clear input after sending

      // Simulate a bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.

Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.

Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.`,
            sender: "bot",
          },
        ]);
      }, 1000); // Delayed response
    }
  };

  return (
    <div className="main-grid">
      <div className="container-sidebar">
        <div className="account-info">
          <FaUserCircle className="profile-icon" />
          <div>
            <div className="account-name">Antoine Piedanna</div>
            <div className="account-type">Free account</div>
          </div>
        </div>
        <div className="w-full">
          <button className="new-chat-btn">+ Start a new chat</button>
          <div className="settings">
            {[
              { icon: FaTrashAlt, text: "Clear all conversations" },
              { icon: FaSun, text: "Switch Light Mode" },
              { icon: FaGem, text: "Upgrade to GPT Pro" },
              { icon: FaQuestionCircle, text: "Updates & FAQ" },
              { icon: FaPowerOff, text: "Log out" },
            ].map((item, index) => (
              <div key={index} className="settings-item tracking-wider">
                <item.icon className="icon" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/raylabs-804be.appspot.com/o/Landing%20Page%2Flogo-rayLabs3.png?alt=media&token=6ffa96d9-d1ec-449e-9cba-10c3f3d9a182"
            alt="RayLabs Logo"
          />
        </div>
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
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="fixed bottom-[10px] py-4 flex justify-center items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
