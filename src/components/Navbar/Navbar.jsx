import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileProfileMenuOpen, setMobileProfileMenuOpen] = useState(false);

  const desktopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setProfileMenuOpen(false);
    setMobileProfileMenuOpen(false);
    setMobileMenuOpen(false);
    navigate("/signin"); // 🔑 Redirect after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <h2>MockTankAI</h2>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Center Menu (Mobile dropdown) */}
        <ul className={`navbar-menu ${mobileMenuOpen ? "open" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>

          <li className="navbar-item">
            <Link
              to={user ? "/simulation" : "/signin"}
              className="navbar-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Simulations
            </Link>
          </li>

          <li className="navbar-item">
            <Link
              to={user ? "/recents" : "/signin"}
              className="navbar-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recents
            </Link>
          </li>

          <li className="navbar-item">
            <Link
              to={user ? "/feedback" : "/signin"}
              className="navbar-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Feedback
            </Link>
          </li>

          {/* ✅ Mobile-only Get Started */}
          {!user && (
            <li className="navbar-item mobile-only">
              <Link to="/signin" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                <button className="navbar-button">Get Started</button>
              </Link>
            </li>
          )}

          {/* ✅ Mobile-only Profile */}
          {user && (
            <li className="navbar-item navbar-profile mobile-only" ref={mobileMenuRef}>
              <img
                src={user.photoURL || "/default-pfp.png"}
                alt="Profile"
                className="navbar-pfp"
                onClick={() => setMobileProfileMenuOpen(!mobileProfileMenuOpen)}
              />
              {mobileProfileMenuOpen && (
                <div className="navbar-menu-dropdown">
                  <p className="dropdown-item" onClick={handleLogout}>Logout</p>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Desktop-only Right Section */}
        <div className="navbar-right">
          {!user ? (
            <Link to="/signin" className="navbar-cta">
              <button className="navbar-button">Get Started</button>
            </Link>
          ) : (
            <div className="navbar-profile" ref={desktopMenuRef}>
              <img
                src={user.photoURL || "/default-pfp.png"}
                alt="Profile"
                className="navbar-pfp"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              />
              {profileMenuOpen && (
                <div className="navbar-menu-dropdown">
                  <p className="dropdown-item" onClick={handleLogout}>Logout</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




