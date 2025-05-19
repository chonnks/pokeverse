import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../img/logo_shortened.png"; // Adjust path if necessary

/**
 * Navbar Component
 * Provides a consistent navigation bar across all pages of the application.
 * Includes links to Home, About, and Help pages.
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="Pokeverse Logo" className="logo-img" />
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          About
        </NavLink>
        <NavLink 
          to="/help" 
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Help
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
