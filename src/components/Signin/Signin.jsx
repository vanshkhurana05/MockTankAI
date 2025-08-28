import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa";
import "./SignIn.css"; 
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in with:", email, password);
  };

  const handleGoogleLogin = () => {
    console.log("Google Login Clicked");
    // integrate Google login here
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="sign-in-header">
        <Link to="/">
        <button className="back-btn">
        <FaArrowLeft size={20} /> 
    </button>
        </Link>
        <h2 className="signin-title">Sign In</h2>
        </div>
            
        <form onSubmit={handleSubmit} className="signin-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signin-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signin-input"
          />
          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <div className="signin-divider">
          <div className="line"></div>
          <span>OR</span>
          <div className="line"></div>
        </div>

        <button onClick={handleGoogleLogin} className="google-btn">
          <FcGoogle className="google-icon" /> Sign in with Google
        </button>

        <p className="signin-footer">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
