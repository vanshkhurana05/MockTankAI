import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa";
import "./SignIn.css"; 
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import bgin from "../../assets/bo3.png"; // ✅ Fixed import path

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Email & Password Sign-In
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed in successfully:", user);
        navigate("/simulation"); // ✅ Redirect after login
      })
      .catch((err) => {
        console.error("Error during sign-in:", err);
        setError(err.message);
      });
  };

  // ✅ Google Sign-In
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google Sign-In successful. User:", user);
        navigate("/simulation"); // ✅ Redirect after login
      })
      .catch((error) => {
        console.error("Error during Google Sign-In:", error);
        setError(error.message);
      });
  };

  return (
    <div
      className="signin-container"
      style={{
        backgroundImage: `url(${bgin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
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
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signin-input"
            required
          />
          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        {/* ✅ Show errors if login fails */}
        {/* {error && <p className="error-message">{error}</p>} */}

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

