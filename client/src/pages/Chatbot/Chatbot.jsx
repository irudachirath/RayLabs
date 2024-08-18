import './Chatbot.css';
import { FaUserCircle, FaTrashAlt, FaSun, FaGem, FaQuestionCircle, FaPowerOff } from 'react-icons/fa';
import arrow from "../../assets/arrow.svg";

const ChatbotPage = () => {
  return (
    <div className='container-main'>
      <div className="main-grid">
        <div className="container-sidebar">
          <div className="account-info">
            <FaUserCircle className="profile-icon" />
            <div>
              <div className="account-name">Antoine Piedanna</div>
              <div className="account-type">Free account</div>
            </div>
          </div>
          <button className="new-chat-btn">+ Start a new chat</button>

          <div className="settings">
            <div className="settings-item"><FaTrashAlt className="icon" />Clear all conversations</div>
            <div className="settings-item"><FaSun className="icon" />Switch Light Mode</div>
            <div className="settings-item"><FaGem className="icon" />Upgrade to GPT Pro</div>
            <div className="settings-item"><FaQuestionCircle className="icon" />Updates & FAQ</div>
            <div className="settings-item logout"><FaPowerOff className="icon" />Log out</div>
          </div>
        </div>
        
        <div className="container">
          <div className="header">
            <img className="logo" src="client/src/assets/logo.png" alt="RayLabs Logo" />
            <h1 className="title">Chat With RayLabs</h1>
            <p className="tagline">The power of AI at your service - Tame the knowledge!</p>
          </div>
          <div className="features">
            <div className="feature-box">
              <h3>Clear and precise</h3>
              <p>Pariatur sint laborum cillum aute consectetur irure.</p>
            </div>
            <div className="feature-box">
              <h3>Personalized answers</h3>
              <p>Pariatur sint laborum cillum aute consectetur irure.</p>
            </div>
            <div className="feature-box">
              <h3>Increased efficiency</h3>
              <p>Pariatur sint laborum cillum aute consectetur irure.</p>
            </div>
          </div>
          <div className="chat-input">
            <input type="text" className="chat-textbox" placeholder='Type your message here...' />
            <img src={arrow} alt="" className='arrow' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;