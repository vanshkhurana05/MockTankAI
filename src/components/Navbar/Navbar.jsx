import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo">
          <h2>MockTankAI</h2>
        </div>

        {/* Hamburger Toggle */}
        <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Menu */}
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/simulation" className="navbar-link" onClick={() => setIsOpen(false)}>Simulations</Link>
          </li>
          <li className="navbar-item">
            <Link to="#" className="navbar-link" onClick={() => setIsOpen(false)}>Recents</Link>
          </li>
          <li className="navbar-item">
            <Link to="/feedback" className="navbar-link" onClick={() => setIsOpen(false)}>Feedback</Link>
          </li>
        </ul>

        {/* CTA button stays right on desktop, collapses below menu on mobile */}
        <div className={`navbar-cta ${isOpen ? 'active' : ''}`}>
          <Link to="/signin" onClick={() => setIsOpen(false)}>
            <button className="navbar-button">Get Started</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
