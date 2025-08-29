import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
function Dashboard() {
  return (
    <div>

      <Navbar/>
      {/* Hero Section */}
      <section className="hero">
        <h1>AI-Powered Pitch Coaching</h1>
        <p>
          Elevate your pitch with AI-driven insights and personalized feedback.
          Practice, refine, and deliver with confidence.
        </p>
         <Link to="/signin" >
        <button className="btn-primary">Get Started</button>
        </Link>
      </section>

      {/* Problem & Solution */}
      <section className="problem-solution">
        <div>
          <h2>The Problem</h2>
          <p>
            Crafting a compelling pitch is challenging. It requires a deep
            understanding of your audience, clear articulation of your value
            proposition, and the ability to deliver with impact. Many struggle
            with identifying weaknesses, refining their message, and practicing
            effectively.
          </p>
        </div>
        <div>
          <h2>Our Solution</h2>
          <p>
            MockTank AI provides an AI-powered platform to help you master your
            pitch. Our technology analyzes your delivery, provides personalized
            feedback, and offers actionable insights to improve your clarity,
            confidence, and overall effectiveness.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Comprehensive Pitch Coaching</h2>
        <p>
          MockTank AI offers a suite of features designed to help you create and
          deliver a winning pitch.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>AI-Powered Feedback</h3>
            <p>
              Receive instant feedback on your pitch content, delivery, and
              audience engagement. Our AI analyzes your performance and provides
              actionable insights to help you refine your message.
            </p>
          </div>
          <div className="feature-card">
            <h3>Practice Simulations</h3>
            <p>
              Practice your pitch in realistic simulations with virtual
              audiences. Get comfortable with different scenarios and learn to
              handle questions and objections effectively.
            </p>
          </div>
          <div className="feature-card">
            <h3>Performance Analytics</h3>
            <p>
              Track your progress and identify areas for improvement with
              detailed performance analytics. Visualize your strengths and
              weaknesses to optimize your pitch strategy.
            </p>
          </div>
        </div>
      </section>

<div className='btn-container'>
     <Link to="/signin" >
    <button className="btn-big">Get Started</button>
    </Link>
</div>
        


      {/* Footer */}
      <footer className="footer">
        <p>© 2025 MockTank AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard