import React from "react";
import logo from "../images/logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <div>
          <img src={logo} alt="Logo" />
        </div>
        <div>
          <h2>Forest Observatory Prediction</h2>
        </div>
      </div>
      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
