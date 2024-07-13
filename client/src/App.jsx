import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import Chatbot from "./pages/Chatbot/Chatbot";
import ImageInputReport from "./pages/ImageInputReport/ImageInputReport";
import UserHistory from "./pages/UserHistory/UserHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/image-input-report" element={<ImageInputReport />} />
        <Route path="/user-history" element={<UserHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
