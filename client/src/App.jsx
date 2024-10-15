import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import Chatbot from "./pages/Chatbot/Chatbot";
import ImageInputReport from "./pages/ImageInputReport/ImageInputReport";
import UserHistory from "./pages/UserHistory/UserHistory";
import AboutUs from "./pages/AboutUs/AboutUs";
import ReportPage from "./pages/ReportPage/ReportPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/image-input-report" element={<ImageInputReport />} />
          <Route path="/user-history" element={<UserHistory />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/report/:id" element={<ReportPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 1000,
            style: {
              backgroundColor: "green",
              color: "white",
              fontSize: "16px",
              fontWeight: "500",
              maxWidth: "500px",
              padding: "16px 24px",
              borderRadius: "7px",
              backdropFilter: "blur(10px)",
            },
          },

          error: {
            duration: 3000,
            style: {
              backgroundColor: "red",
              color: "white",
              fontSize: "16px",
              fontWeight: "500",
              maxWidth: "500px",
              padding: "16px 24px",
              borderRadius: "7px",
              backdropFilter: "blur(10px)",
            },
          },
          style: {
            fontSize: "16px",
            fontWeight: "500",
            maxWidth: "500px",
            padding: "16px 24px",
            borderRadius: "7px",
            backdropFilter: "blur(10px)",
          },
        }}
      />
    </>
  );
}

export default App;
