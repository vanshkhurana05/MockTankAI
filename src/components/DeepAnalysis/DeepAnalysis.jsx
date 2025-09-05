// DeepAnalysis.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";
import bgImage from "../../assets/bo2.png";
import "./DeepAnalysis.css";

const DeepAnalysis = () => {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        if (!currentUser) return;

        setLoading(true);
        const response = await fetch(
          `https://mocktankbackend-i0js.onrender.com/get_chats/${currentUser.uid}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSessions(data.sessions || []);
      } catch (err) {
        setError(err.message || "Failed to fetch sessions");
        console.error("Error fetching session data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [currentUser]);

  // latest session
  const currentSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;

  return (
    <div
      className="analysis-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <div className="analysis-wrapper">
        {loading && (
          <div className="analysis-container">
            <div className="loading-spinner" />
            <p style={{ textAlign: "center" }}>Loading your session data...</p>
          </div>
        )}

        {error && (
          <div className="analysis-container">
            <div className="error-message">
              <h3>Error Loading Data</h3>
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
          </div>
        )}

        {!loading && !error && !currentSession && (
          <div className="analysis-container">
            <div className="no-data">
              <h3>No Session Data Available</h3>
              <p>Complete a chat session to see your analysis here.</p>
            </div>
          </div>
        )}

        {!loading && !error && currentSession && (
          <div className="analysis-container">
            <header className="analysis-header">
              <h1>Chat Session Analysis</h1>
              <p>Detailed metrics from your latest conversation</p>
            </header>

            <div className="tabs">
              <button
                className={activeTab === "overview" ? "active" : ""}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={activeTab === "comparison" ? "active" : ""}
                onClick={() => setActiveTab("comparison")}
              >
                Session History
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "overview" && <OverviewTab session={currentSession} />}
              {activeTab === "comparison" && <ComparisonTab sessions={sessions} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------- Overview Tab (keeps your existing functional charts) ---------- */
const OverviewTab = ({ session }) => {
  // normalize values to numbers (safe fallback)
  const metrics = [
    { name: "Words Per Minute", value: Number(session.wpm) || 0, max: 100, unit: "wpm" },
    { name: "Response Length", value: Number(session.res_length) || 0, max: 20, unit: "words" },
    { name: "Clarity Index", value: Number(session.clarityIdx) || 0, max: 100, unit: "%" },
    { name: "Vocabulary Richness", value: Number(session.vocabRichness) || 0, max: 1, unit: "" },
    { name: "Engagement Score", value: Number(session.engagement_score) || 0, max: 1, unit: "" },
    { name: "Confidence Score", value: Number(session.confidence_score) || 0, max: 1, unit: "" },
  ];

  // a helper to compute percent width safely
  const pct = (val, max) => {
    if (!isFinite(val) || !isFinite(max) || max === 0) return 0;
    return Math.max(0, Math.min(100, (val / max) * 100));
  };

  // Build clipPath polygon for radar using same math you used (keeps functionality)
  const buildRadarClip = () => {
    // angles spaced ~60deg (1.047 rad)
    const vals = metrics.map((m, idx) => {
      const angle = idx * 1.047; // radians
      // scale each to 0..40 (radius factor)
      const scale = (m.value / m.max) * 40;
      const x = 50 + scale * Math.cos(angle);
      const y = 50 - scale * Math.sin(angle);
      return `${x}% ${y}%`;
    });
    return `polygon(${vals.join(",")})`;
  };

  const radarClip = buildRadarClip();

  return (
    <div className="overview-tab">
      <div className="metrics-grid">
        {metrics.map((metric, i) => (
          <div key={i} className="metric-card">
            <h3>{metric.name}</h3>
            <div className="metric-value">{metric.value} {metric.unit}</div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${pct(metric.value, metric.max)}%` }}
              />
            </div>

            <div className="metric-max">Max: {metric.max}{metric.unit}</div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        {/* Radar Chart */}
        <div className="chart-container">
          <h3>Performance Radar</h3>
          <div className="radar-chart">
            <div className="radar-grid">
              {[1,2,3,4,5].map((n) => <div key={n} className="radar-circle" />)}
              <div className="radar-shape" style={{ clipPath: radarClip }} />
            </div>

            <div className="radar-labels">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="radar-label"
                  style={{
                    left: `${50 + 45 * Math.cos(i * 1.047)}%`,
                    top: `${50 - 45 * Math.sin(i * 1.047)}%`,
                  }}
                >
                  {m.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="chart-container">
          <h3>Score Distribution</h3>
          <div className="bar-chart">
            {metrics.map((metric, i) => (
              <div key={i} className="bar-chart-item">
                <div className="bar-label">{metric.name}</div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${pct(metric.value, metric.max)}%` }}
                  />
                </div>
                <div className="bar-value">
                  {metric.value}
                  {metric.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Comparison Tab ---------- */
const ComparisonTab = ({ sessions }) => {
  const validSessions = sessions.filter(s => s && (s.wpm !== undefined || s.res_length !== undefined));

  return (
    <div className="comparison-tab">
      <h3>Session History Comparison</h3>

      {validSessions.length === 0 ? (
        <p>No valid session data available for comparison.</p>
      ) : (
        <>
          <div className="session-list">
            {validSessions.map((session, idx) => (
              <div key={idx} className="session-item">
                <h4>Session {idx + 1}</h4>
                <div className="session-metrics">
                  <span>WPM: {session.wpm || "0"}</span>
                  <span>Clarity: {session.clarityIdx || "0"}%</span>
                  <span>Vocab: {session.vocabRichness || "0"}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DeepAnalysis;



