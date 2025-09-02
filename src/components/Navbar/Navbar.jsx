import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase'; // adjust the path
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
  };

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
          <li className="navbar-item">
            <Link to="#" className="navbar-link">Recents</Link>
          </li>
          <li className="navbar-item">
            <Link to="/feedback" className="navbar-link">Feedback</Link>
          </li>
        </ul>

        {/* ✅ Conditional Rendering */}
        {user ? (
          <div className="navbar-profile" ref={menuRef}>
            <img
              src={user.photoURL || "/default-pfp.png"}
              alt="Profile"
              className="navbar-pfp"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            
            {menuOpen && (
              <div className="navbar-menu-dropdown">
                <p className="dropdown-item" onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin" className="navbar-signin-link">
            <div className="navbar-cta">
              <button className="navbar-button">Get Started</button>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

