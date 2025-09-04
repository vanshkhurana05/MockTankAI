// DeepAnalysis.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";
import './DeepAnalysis.css';

const DeepAnalysis = () => {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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
        setError(err.message);
        console.error('Error fetching session data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [currentUser]);

  // Get the latest session for visualization
  const currentSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;

  if (loading) {
    return (
      <div className="analysis-container">
        <div className="loading-spinner"></div>
        <p>Loading your session data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analysis-container">
        <div className="error-message">
          <h3>Error Loading Data</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  if (!currentSession) {
    return (
      <div className="analysis-container">
        <div className="no-data">
          <h3>No Session Data Available</h3>
          <p>Complete a chat session to see your analysis here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analysis-container">
      <header className="analysis-header">
        <h1>Chat Session Analysis</h1>
        <p>Detailed metrics from your latest conversation</p>
      </header>

      <div className="tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'detailed' ? 'active' : ''}
          onClick={() => setActiveTab('detailed')}
        >
          Detailed Metrics
        </button>
        <button 
          className={activeTab === 'comparison' ? 'active' : ''}
          onClick={() => setActiveTab('comparison')}
        >
          Session History
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && <OverviewTab session={currentSession} />}
        {activeTab === 'detailed' && <DetailedTab session={currentSession} />}
        {activeTab === 'comparison' && <ComparisonTab sessions={sessions} />}
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ session }) => {
  const metrics = [
    { name: 'Words Per Minute', value: session.wpm || '0', max: 100, unit: 'wpm' },
    { name: 'Response Length', value: session.res_length || '0', max: 20, unit: 'words' },
    { name: 'Clarity Index', value: session.clarityIdx || '0', max: 100, unit: '%' },
    { name: 'Vocabulary Richness', value: session.vocabRichness || '0', max: 1, unit: '' },
    { name: 'Engagement Score', value: session.engagement_score || '0', max: 1, unit: '' },
    { name: 'Confidence Score', value: session.confidence_score || '0', max: 1, unit: '' },
  ];

  return (
    <div className="overview-tab">
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <h3>{metric.name}</h3>
            <div className="metric-value">{metric.value} {metric.unit}</div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(parseFloat(metric.value) / metric.max) * 100}%` }}
              ></div>
            </div>
            <div className="metric-max">Max: {metric.max}{metric.unit}</div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart-container">
          <h3>Performance Radar</h3>
          <div className="radar-chart">
            {/* Simplified radar chart using CSS */}
            <div className="radar-grid">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} className="radar-circle"></div>
              ))}
              
              {/* Radar points */}
              <div 
                className="radar-shape"
                style={{ clipPath: `polygon(
                  ${50 + (parseFloat(metrics[0].value) / metrics[0].max) * 40 * Math.cos(0)}% ${50 - (parseFloat(metrics[0].value) / metrics[0].max) * 40 * Math.sin(0)}%,
                  ${50 + (parseFloat(metrics[1].value) / metrics[1].max) * 40 * Math.cos(1.047)}% ${50 - (parseFloat(metrics[1].value) / metrics[1].max) * 40 * Math.sin(1.047)}%,
                  ${50 + (parseFloat(metrics[2].value) / metrics[2].max) * 40 * Math.cos(2.094)}% ${50 - (parseFloat(metrics[2].value) / metrics[2].max) * 40 * Math.sin(2.094)}%,
                  ${50 + (parseFloat(metrics[3].value) / metrics[3].max) * 40 * Math.cos(3.141)}% ${50 - (parseFloat(metrics[3].value) / metrics[3].max) * 40 * Math.sin(3.141)}%,
                  ${50 + (parseFloat(metrics[4].value) / metrics[4].max) * 40 * Math.cos(4.188)}% ${50 - (parseFloat(metrics[4].value) / metrics[4].max) * 40 * Math.sin(4.188)}%,
                  ${50 + (parseFloat(metrics[5].value) / metrics[5].max) * 40 * Math.cos(5.235)}% ${50 - (parseFloat(metrics[5].value) / metrics[5].max) * 40 * Math.sin(5.235)}%
                )` }}
              ></div>
            </div>
            
            <div className="radar-labels">
              {metrics.map((metric, i) => (
                <div 
                  key={i}
                  className="radar-label"
                  style={{
                    left: `${50 + 45 * Math.cos(i * 1.047)}%`,
                    top: `${50 - 45 * Math.sin(i * 1.047)}%`
                  }}
                >
                  {metric.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h3>Score Distribution</h3>
          <div className="bar-chart">
            {metrics.map((metric, i) => (
              <div key={i} className="bar-chart-item">
                <div className="bar-label">{metric.name}</div>
                <div className="bar-track">
                  <div 
                    className="bar-fill"
                    style={{ width: `${(parseFloat(metric.value) / metric.max) * 100}%` }}
                  ></div>
                </div>
                <div className="bar-value">{metric.value}{metric.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Detailed Tab Component
const DetailedTab = ({ session }) => {
  return (
    <div className="detailed-tab">
      <div className="detailed-metrics">
        <div className="detailed-card">
          <h3>Conversation Metrics</h3>
          <div className="metric-detail">
            <span className="label">Words Per Minute:</span>
            <span className="value">{session.wpm || '0'} wpm</span>
          </div>
          <div className="metric-detail">
            <span className="label">Response Length:</span>
            <span className="value">{session.res_length || '0'} words</span>
          </div>
          <div className="metric-detail">
            <span className="label">Clarity Index:</span>
            <span className="value">{session.clarityIdx || '0'}%</span>
            <div className="detail-explanation">
              Measures how clear and understandable your responses were
            </div>
          </div>
        </div>

        <div className="detailed-card">
          <h3>Language Quality</h3>
          <div className="metric-detail">
            <span className="label">Vocabulary Richness:</span>
            <span className="value">{session.vocabRichness || '0'}</span>
            <div className="detail-explanation">
              Diversity of words used in your responses (0-1 scale)
            </div>
          </div>
        </div>

        <div className="detailed-card">
          <h3>Engagement Metrics</h3>
          <div className="metric-detail">
            <span className="label">Engagement Score:</span>
            <span className="value">{session.engagement_score || '0'}</span>
            <div className="detail-explanation">
              How engaging and interactive your responses were (0-1 scale)
            </div>
          </div>
          <div className="metric-detail">
            <span className="label">Confidence Score:</span>
            <span className="value">{session.confidence_score || '0'}</span>
            <div className="detail-explanation">
              Measurement of assertiveness and confidence in responses (0-1 scale)
            </div>
          </div>
        </div>
      </div>

      <div className="time-series-chart">
        <h3>Response Pattern Over Time</h3>
        <div className="time-chart-placeholder">
          <p>This visualization would show how your metrics changed throughout the conversation.</p>
          <div className="simulated-chart">
            <div className="chart-line" style={{ '--wpm-value': session.wpm || 0, '--clarity-value': session.clarityIdx || 0 }}>
              <div className="line wpm-line"></div>
              <div className="line clarity-line"></div>
            </div>
            <div className="chart-x-axis">
              <span>Start</span>
              <span>Middle</span>
              <span>End</span>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="color-box wpm"></div>
                <span>Words Per Minute</span>
              </div>
              <div className="legend-item">
                <div className="color-box clarity"></div>
                <span>Clarity Index</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Comparison Tab Component
const ComparisonTab = ({ sessions }) => {
  // Filter out empty sessions for comparison
  const validSessions = sessions.filter(s => 
    s && (s.wpm !== undefined || s.res_length !== undefined)
  );
  
  return (
    <div className="comparison-tab">
      <h3>Session History Comparison</h3>
      
      {validSessions.length === 0 ? (
        <p>No valid session data available for comparison.</p>
      ) : (
        <>
          <div className="session-list">
            {validSessions.map((session, index) => (
              <div key={index} className="session-item">
                <h4>Session {index + 1}</h4>
                <div className="session-metrics">
                  <span>WPM: {session.wpm || '0'}</span>
                  <span>Clarity: {session.clarityIdx || '0'}%</span>
                  <span>Vocab: {session.vocabRichness || '0'}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="comparison-chart">
            <h4>Words Per Minute Trend</h4>
            <div className="trend-chart">
              {validSessions.map((session, i) => (
                <div key={i} className="trend-bar-container">
                  <div 
                    className="trend-bar" 
                    style={{ height: `${(parseFloat(session.wpm || 0) / 100) * 100}%` }}
                  >
                    <span className="trend-value">{session.wpm || '0'}</span>
                  </div>
                  <span className="session-label">Session {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeepAnalysis;

