import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up with:", name, email, password);

    // ✅ After successful signup redirect
    navigate("/dashboard"); // 
  };

  const handleGoogleLogin = () => {
    console.log("Google Signup Clicked");
    // integrate Google login here
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-header">
            <Link to="/">
                    <button className="back-btn">
                    <FaArrowLeft size={20} /> 
                </button>
            </Link>
            <h2 className="signup-title">Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <div className="divider">
          <div className="line"></div>
          <span>OR</span>
          <div className="line"></div>
        </div>

        <button onClick={handleGoogleLogin} className="google-btn">
          <FcGoogle className="google-icon" /> Sign up with Google
        </button>

        <p className="signin-text">
          Already have an account?{" "}
          <Link to="/signin" className="signin-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
