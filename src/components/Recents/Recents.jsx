import React, { useEffect, useState } from "react";
import "./Recents.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import bgImage from "../../assets/bo2.png";

const Recents = () => {
  const { currentUser, authLoading } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) return;

    const fetchSessions = async () => {
      try {
        // step 1: get list of sessions
        const response = await fetch(
          `https://mocktankbackend-i0js.onrender.com/get_chats/${currentUser.uid}`
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        const sessionList = data.sessions || [];

        // step 2: fetch details for each session to get chats
        const detailedSessions = await Promise.all(
          sessionList.map(async (session) => {
            try {
              const res = await fetch(
                `https://mocktankbackend-i0js.onrender.com/users/${currentUser.uid}/sessions/${session.sessionId}`
              );
              if (!res.ok) return { ...session, preview: "Untitled Session" };

              const details = await res.json();

              // find first user message
              const firstUserMessage = details.chats?.find(
                (chat) => chat.speaker === "user"
              );

              const preview = firstUserMessage
                ? firstUserMessage.text
                    .split(" ")
                    .slice(0, 11)
                    .join(" ") + "..."
                : "Untitled Session";

              return { ...session, preview };
            } catch {
              return { ...session, preview: "Untitled Session" };
            }
          })
        );
        detailedSessions.sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

setSessions(detailedSessions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [currentUser, authLoading]);

  return (
    <div
      className="recents-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />

      <div className="recents-wrapper">
        <h2 className="page-title">Recents</h2>
        <p className="page-subtitle">Review your past chat sessions.</p>

        {authLoading ? (
          <p className="status-msg">Checking login...</p>
        ) : !currentUser ? (
          <p className="status-msg">Please sign in to view recents.</p>
        ) : loading ? (
          <p className="status-msg">Loading recent sessions...</p>
        ) : error ? (
          <p className="status-msg error">Error: {error}</p>
        ) : sessions.length === 0 ? (
          <p className="status-msg">No sessions found.</p>
        ) : (
          <div className="chat-list">
            {sessions.map((session) => (
              <Link
                to={`/recents/${session.sessionId}`}
                key={session.sessionId}
                className="chat-item"
              >
                <div className="chat-icon">💬</div>
                <div className="chat-info">
                  <h3>{session.preview}</h3>
                  {/* <p>ID: {session.sessionId}</p> */}
                  <span className="timestamp">
                    created at:{" "}
                    {new Date(session.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recents;










