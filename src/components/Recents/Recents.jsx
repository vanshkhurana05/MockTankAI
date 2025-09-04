import React, { useEffect, useState } from "react";
import "./Recents.css";
import Navbar from "../Navbar/Navbar";

const Recents = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulated API fetch
    const data = {
      name: "Sarah",
      sessionsCompleted: 12,
      averageScore: 8.5,
      sessions: [
        { id: 1, date: "2024-07-20", status: "Completed" },
        { id: 2, date: "2024-07-15", status: "Completed" },
        { id: 3, date: "2024-07-10", status: "In Progress" },
        { id: 4, date: "2024-07-05", status: "Completed" },
        { id: 5, date: "2024-06-30", status: "Completed" },
      ],
    };
    setUserData(data);
  }, []);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="recent-container">
        <div>
        <Navbar />
        </div>
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
  );
};

export default Recents;
