import React from 'react';
import './Dashboard.css';
import { FaLightbulb, FaLaptopCode, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import '../../ui_components/bg/bg.css';
import GridDistortion from '../../ui_components/bg/bg';
import '../../ui_components/bg/download.png     '

const Dashboard = () => {
  return (
    <div className="dashboard-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <GridDistortion
          imageSrc="../../ui_components/bg/download.png"
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="custom-class"
        />
      </div>

      {/* Foreground content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <header className="dashboard-header">
          <h1>Welcome to MockTank AI</h1>
          <p>Your personal AI-powered pitch coach</p>
        </header>
        <main className="dashboard-main">
          <div className="feature-cards">
            <div className="feature-card">
              <div className="card-icon">
                <FaLightbulb size={70} />
              </div>
              <h2>AI-Powered Feedback</h2>
              <p>Get instant, personalized feedback on your pitch delivery and content.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">
                <FaLaptopCode size={70} />
              </div>
              <h2>Practice Simulations</h2>
              <p>Hone your skills in realistic simulations with virtual audiences.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">
                <FaChartLine size={70} />
              </div>
              <h2>Performance Analytics</h2>
              <p>Track your progress with detailed analytics and identify areas for improvement.</p>
            </div>
          </div>
          <div className="cta-section">
            <Link to="/signin">
              <button className="cta-button">Get Started</button>
            </Link>
          </div>
        </main>
        <footer className="dashboard-footer">
          <p>© 2025 MockTank AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
