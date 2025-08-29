import React, { useState } from "react";
import "./FeedbackForm.css";
import Navbar from "../Navbar/Navbar";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    setSubmitted(true);

    // reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
      rating: "",
    });
  };

  return (
    <div>
        <Navbar></Navbar>
    <div className="feedback-container">
      <h2>We Value Your Feedback</h2>
      {!submitted ? (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Rate your experience</option>
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Very Poor</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Feedback"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="feedback-btn">
            Submit Feedback
          </button>
        </form>
      ) : (
        <p className="thank-you">✅ Thank you for your feedback!</p>
      )}
    </div>
    </div>
  );
}
