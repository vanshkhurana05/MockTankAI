import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import bgin from "../../assets/bo3.png";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User registered successfully:", user);
        navigate("/simulation"); // ✅ Redirect after sign up
      })
      .catch((err) => {
        console.error("Error during Sign Up:", err);
        setError(err.message);
      });
  };

  // ✅ Handle Google Sign Up
  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google Sign-Up successful. User:", user);
        navigate("/simulation"); // ✅ Redirect after sign up
      })
      .catch((error) => {
        console.error("Error during Google Sign-Up:", error);
        setError(error.message);
      });
  };

  return (
    <div style={{
            backgroundImage: `url(${bgin})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }} className="signup-container">
      <div className="signup-box">
        <div className="sign-up-header">
          <Link to="/">
            <button className="back-btn">
              <FaArrowLeft size={20} /> 
            </button>
          </Link>
          <h2 className="signup-title">Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-input"
            required
          />
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        {/* ✅ Show error if something fails */}
        {error && <p className="error-message">{error}</p>}

        <div className="signin-divider">
          <div className="line"></div>
          <span>OR</span>
          <div className="line"></div>
        </div>

        <button onClick={handleGoogleSignup} className="google-btn">
          <FcGoogle className="google-icon" /> Sign up with Google
        </button>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/signin" className="signin-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
