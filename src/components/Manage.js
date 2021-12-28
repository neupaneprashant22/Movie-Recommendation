import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./Login";
import Header from "./Header";
import App from "./../app";
import Signup from "./Signup";
import Home from "./Home";

export default function Manage() {
  console.log("Function called");
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
