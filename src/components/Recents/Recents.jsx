import React, { useEffect, useState } from "react";
import "./Recents.css";
import { FaUser, FaBuilding, FaComments } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";

const Recents = () => {
  const { currentUser, authLoading } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // dummy user data (you can replace with backend later)
  const [userData] = useState({
    name: "Sarah",
    sessionsCompleted: 12,
    averageScore: 89,
    sessions: [
      { id: 1, date: "2025-09-01", status: "Completed" },
      { id: 2, date: "2025-09-02", status: "In Progress" }
    ]
  });

  useEffect(() => {
    async function fetchHistory() {
      if (authLoading) return;

      if (!currentUser) {
        setError("Please sign in to view your conversations.");
        setLoading(false);
        return;
      }

      try {
        const uid = currentUser.uid;
        const response = await fetch(
          `https://mocktankbackend-i0js.onrender.com/get_chats/${uid}`
        );

        if (!response.ok) throw new Error("Failed to fetch history");

        const data = await response.json();
        setHistory(data.history || []);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Could not load recent conversation.");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [currentUser, authLoading]);

  if (authLoading) {
    return <p className="empty-text">Checking authentication...</p>;
  }

  if (loading) {
    return <p className="empty-text">Loading...</p>;
  }

  if (error) {
    return <p className="empty-text">{error}</p>;
  }

  return (
    <div className="recent-container">
      <Navbar />

      {/* --- User Stats Section --- */}
      <div className="recent-content">
        <h1>Welcome back, {userData.name}</h1>

        <div className="stats-container">
          <div className="stat-card">
            <p>Sessions Completed</p>
            <h2>{userData.sessionsCompleted}</h2>
          </div>
          <div className="stat-card">
            <p>Average Score</p>
            <h2>{userData.averageScore}</h2>
          </div>
        </div>

        <h2 className="recent-title">Recent Sessions</h2>
        <table className="recent-table">
          <thead>
            <tr>
              <th>Session</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userData.sessions.map((s, idx) => (
              <tr key={s.id}>
                <td>Session {idx + 1}</td>
                <td>{s.date}</td>
                <td>
                  <span
                    className={`status-badge ${
                      s.status === "Completed" ? "completed" : "in-progress"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="btn-container">
          <button className="btn start">Start New Session</button>
          <button className="btn review">Review Feedback</button>
        </div>
      </div>

      {/* --- Recent Conversation Section --- */}
      <div className="recents-header">
        <FaComments /> Recent Conversation
      </div>

      {history.length === 0 ? (
        <p className="empty-text">No messages found.</p>
      ) : (
        <div className="conversation-list">
          {history.map((msg, index) => (
            <div
              key={index}
              className={`conversation-card ${
                msg.speaker === "user" ? "user-msg" : "investor-msg"
              }`}
            >
              <div className="card-header">
                {msg.speaker === "user" ? (
                  <>
                    <FaUser className="icon user-icon" />
                    <span>You</span>
                  </>
                ) : (
                  <>
                    <FaBuilding className="icon investor-icon" />
                    <span>{msg.name || "Investor"}</span>
                  </>
                )}
              </div>
              <div className="card-body">{msg.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recents;
