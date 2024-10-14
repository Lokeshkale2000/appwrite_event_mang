
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 
const Navbar = () => (
  <nav className="navbar">
    <header className="H1">Event Management Application</header>
    <Link to="/" className="link1">Show Events</Link>
    <Link to="/create" className="link2">Create Event</Link>
  </nav>
);

export default Navbar;
