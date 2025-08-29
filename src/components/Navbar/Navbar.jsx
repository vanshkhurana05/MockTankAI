import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
    
        <div className="navbar-logo">
          <h2>MockTankAI</h2>
        </div>

        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/simulation" className="navbar-link">Simulations</Link>
          </li>
          {/* <li className="navbar-item">
            <Link to="#" className="navbar-link">Analysis</Link>
          </li> */}
          <li className="navbar-item">
            <Link to="#" className="navbar-link">Recents</Link>
          </li>
          <li className="navbar-item">
            <Link to="/feedback" className="navbar-link">Feedback</Link>
          </li>
        </ul>

<Link to="/signin" className="navbar-signin-link">
<div className="navbar-cta">
          <button className="navbar-button">Get Started</button>
        </div>
</Link>
      </div>
    </nav>
  );
};

export default Navbar;

