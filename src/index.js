import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register"
import Forgotpass from "./Forgotpass"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Forgotpassword" element={<Forgotpass />} />
    </Routes>
  </BrowserRouter>
);
