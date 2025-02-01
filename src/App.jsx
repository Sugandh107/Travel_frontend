import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
// import Services from "./components/Services";
import Packages from "./pages/Packages";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Destinations from "./pages/Destinations";
import BlogsPage from "./pages/BlogsPage";
import UserProfilePage from "./pages/UserProfilePage";
import OwnUserProfile from "./pages/OwnUserProfile";
import UserMessagesPage from "./pages/MessagePage";
import MessagesPage from "./pages/MessagePage";
import Message from "./pages/Message";
import ChatPage from "./pages/ChatPage";
import MessagePage from "./pages/MessagePage";
import MessageInbox from "./pages/MessageInbox";
import ExpenseTracker from "./pages/ExpenseTracker";
import Footer from "./components/Footer";
import FlightBooking from "./pages/FlightBooking";

function App() {
  const location = useLocation(); // Get the current route
  
  // Define routes where Navbar and Footer should not appear
  const excludedRoutes = ["/login", "/signup"];
  return (
    <>
      {/* Conditionally render Navbar */}
      {!excludedRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/flights" element={<FlightBooking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/destination" element={<Destinations />} />
        <Route path="/destination/:destinationId" element={<BlogsPage />} />
        <Route path="/user/:userId" element={<UserProfilePage />} />
        <Route path="/profile" element={<OwnUserProfile />} />
        <Route
          path="/messages/:userId/:recipientId"
          element={<MessagePage />}
        />
        <Route path="/expense" element={<ExpenseTracker />} />
        {/* <Route path="/chat" element={<ChatPage />} /> */}
      </Routes>
      
      {/* Conditionally render Footer */}
      {!excludedRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
